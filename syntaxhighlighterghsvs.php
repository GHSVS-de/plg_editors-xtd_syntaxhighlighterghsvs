<?php
defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Object\CMSObject;
use Joomla\CMS\Plugin\CMSPlugin;

class plgButtonSyntaxhighlighterGhsvs extends CMSPlugin
{
	protected $autoloadLanguage = true;
	protected $app;

	function onDisplay($editorname, $asset, $author)
	{
		if (!$this->app->isClient('administrator'))
		{
			return false;
		}

		$user = Factory::getUser();

		$extension = $this->app->input->get('option');

		if ($extension === 'com_categories')
		{
			$parts = explode('.', $this->app->input->get('extension', 'com_content'));
			$extension = $parts[0];
		}

		$asset = $asset !== '' ? $asset : $extension;

		if (
			!(
				$user->authorise('core.edit', $asset)
				|| $user->authorise('core.create', $asset)
				|| (count($user->getAuthorisedCategories($asset, 'core.create')) > 0)
				|| ($user->authorise('core.edit.own', $asset) && $author === $user->id)
				|| (count($user->getAuthorisedCategories($extension, 'core.edit')) > 0)
				|| (count($user->getAuthorisedCategories($extension, 'core.edit.own')) > 0 && $author === $user->id)
			)
		){
			return false;
		}

		$brushOptions = '';
		$warning = '';

		$helperFile = JPATH_SITE . '/plugins/content/syntaxhighlighterghsvs/helper.php';

		if (!is_file($helperFile))
		{
			$warning = 'PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_CONTENT_PLUGIN_HELPER_NOT_FOUND';
		}

		if (!$warning)
		{
			\JLoader::register(
				'SyntaxhighlighterGhsvsHelper',
				JPATH_SITE . '/plugins/content/syntaxhighlighterghsvs/helper.php'
			);

			if (($brushes = \SyntaxhighlighterGhsvsHelper::getBrushfileAliasesMap()) === false)
			{
				$warning = 'PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_BRUSHES_NOT_FOUND';
			}
			else
			{
				foreach ($brushes as $aliases)
				{
					if (!$aliases)
					{
						continue;
					}

					$selected = '';

					if ($aliases[0] === 'text')
					{
						$selected = ' selected="selected"';
					}

					$brushOptions .= '<option value="' . $aliases[0] . '"' . $selected . '>'
						. implode(', ', $aliases) . '</option>';
				}
			}
		}

		$popupDir = 'media/plg_editors-xtd_syntaxhighlighterghsvs/html/';

		$popupTmpl = file_get_contents(JPATH_SITE . '/' . $popupDir .  'insertcode_tmpl.html');

		$replaceWith = array(
			'PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_HEADLINE' => Text::_('PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_HEADLINE'),
			'WARNING' => $warning ? '<p><strong style="color:red">' . Text::_($warning) . '</strong></p>' : '',
			'PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_SELECTBRUSH' => Text::_('PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_SELECTBRUSH'),
			'BRUSHOPTIONS' => $brushOptions,
			'PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_CODEINPUT' => Text::_('PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_CODEINPUT'),
			'PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_TEXTLINES' => Text::_('PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_TEXTLINES'),
			'PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_FIRSTLINE' => Text::_('PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_FIRSTLINE'),
			'PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_INSERTCODE' => Text::_('PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_INSERTCODE'),
		);

		foreach ($replaceWith as $replace => $with)
		{
			$popupTmpl = str_replace($replace, $with, $popupTmpl);
		}

		$lang = Factory::getLanguage();
		$popupFile = $popupDir . 'insertcode_popup.' . $lang->getTag() . '.html';

		file_put_contents(JPATH_SITE . '/' . $popupFile, $popupTmpl);

		JHtml::_('behavior.core');
		Factory::getDocument()->addScriptOptions('xtd-syntaxhighlighterghsvs', array('editor' => $editorname));

		$root = '';

		// Editors prepend JUri::base() to $link. Whyever.
		if ($this->app->isClient('administrator'))
		{
			$root = '../';
		}

		$button = new CMSObject;
		$button->set('class', 'btn');
		$button->modal = true;
		$button->link = $root . $popupFile . '?editor=' . urlencode($editorname);
		$button->set('text', Text::_('PLG_XTD_SYNTAXHIGHLIGHTERGHSVS_BUTTON'));
		$button->name = 'file-add'; // icon class without 'icon-'
		$button->options = "{handler: 'iframe', size: {x: 800, y: 550}}";
		return $button;
	}
}
