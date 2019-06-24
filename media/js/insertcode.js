(function()
{
	"use strict";

	document.addEventListener('DOMContentLoaded', function()
	{
		var form = document.getElementById('SYNTAXHIGHLIGHTERGHSVS');
		var tag;

		document.getElementById('insertSyntaxhighlighterGhsvsCode').addEventListener('click', function()
		{
			if (!window.parent.Joomla.getOptions('xtd-syntaxhighlighterghsvs'))
			{
				// Something went wrong!
				if (window.parent.Joomla.Modal)
				{
					// Joomla 4
					window.parent.Joomla.Modal.getCurrent().close();
				}
				else
				{
					// Joomla 3
					window.parent.jModalClose();
				}
				return false;
			}

			var editor = window.parent.Joomla.getOptions('xtd-syntaxhighlighterghsvs').editor;

			var formData = {};

			for (var i = 0; i < form.elements.length; i++)
			{
				var e = form.elements[i];

				if (e.name)
				{
					formData[e.name] = e.value;
				}
			}

			formData.codeInput = formData.codeInput.replace(/&/g, '&amp;');
			formData.codeInput = formData.codeInput.replace(/\"/g, '&quot;');
			formData.codeInput = formData.codeInput.replace(/\'/g, '&#039;');
			formData.codeInput = formData.codeInput.replace(/</g, '&lt;');
			formData.codeInput = formData.codeInput.replace(/>/g, '&gt;');

			if (!formData.selectBrush)
			{
				formData.selectBrush = "text";
			}

			formData.textLines = formData.textLines.replace(/\s+/gm, '');

			if (formData.textLines)
			{
				formData.textLines = "; highlight:[" + formData.textLines + "]";
			}

			formData.firstLine = formData.firstLine.trim();

			if (!formData.firstLine || isNaN(formData.firstLine))
			{
				formData.firstLine = "";
			}
			else
			{
				formData.firstLine = "; first-line:" + formData.firstLine;
			}

			tag = '<pre class="brush:'
				+ formData.selectBrush
				+ formData.textLines
				+ formData.firstLine + '">' + formData.codeInput + '</pre><p>&nbsp;</p>';

			/** Use the API, if editor supports it **/
			if (window.parent.Joomla && window.parent.Joomla.editors && window.parent.Joomla.editors.instances && window.parent.Joomla.editors.instances.hasOwnProperty(editor))
			{
				window.parent.Joomla.editors.instances[editor].replaceSelection(tag)
			}
			else
			{
				window.parent.jInsertEditorText(tag, editor);
			}

			if (window.parent.Joomla.Modal)
			{
				// Joomla 4
				window.parent.Joomla.Modal.getCurrent().close();
			}
			else
			{
				// Joomla 3
				window.parent.jModalClose();
			}
		});
	});
})();