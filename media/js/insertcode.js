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

			formData.title = formData.title.replace(/&/g, '&amp;');
			formData.title = formData.title.replace(/\"/g, '&quot;');
			formData.title = formData.title.replace(/\'/g, '&#039;');
			formData.title = formData.title.replace(/</g, '&lt;');
			formData.title = formData.title.replace(/>/g, '&gt;');
			formData.title = formData.title.trim();

			formData.ariaLabel = formData.ariaLabel.replace(/&/g, '&amp;');
			formData.ariaLabel = formData.ariaLabel.replace(/\"/g, '&quot;');
			formData.ariaLabel = formData.ariaLabel.replace(/\'/g, '&#039;');
			formData.ariaLabel = formData.ariaLabel.replace(/</g, '&lt;');
			formData.ariaLabel = formData.ariaLabel.replace(/>/g, '&gt;');
			formData.ariaLabel = formData.ariaLabel.trim();

			if (!formData.selectBrush)
			{
				formData.selectBrush = "text";
			}

			formData.firstLine = formData.firstLine.trim();

			if (!formData.firstLine || isNaN(formData.firstLine))
			{
				formData.firstLine = "";
			}

			formData.textLines = formData.textLines.replace(/\s+/gm, '');

			if (formData.textLines)
			{
				if (formData.firstLine)
				{
					var textLinesArray = formData.textLines.split(",");
					var textlines = [];

					for (var i = 0; i < textLinesArray.length; i++)
					{
						if (!isNaN(textLinesArray[i]))
						{
							textlines.push(parseInt(textLinesArray[i]) + parseInt(formData.firstLine) - 1);
						}
					}

					if (textlines.length)
					{
						formData.textLines = "; highlight:[" + textlines.join(",") + "]";
					}
				}
				else
				{
					formData.textLines = "; highlight:[" + formData.textLines + "]";
				}
			}

			if (formData.firstLine)
			{
				formData.firstLine = "; first-line:" + formData.firstLine;
			}

			if (formData.title)
			{
				formData.title = "; title:'" + formData.title + "'";
			}
			if (formData.ariaLabel)
			{
				formData.ariaLabel = " aria-label='" + formData.ariaLabel + "'";
			}
			tag = '<div class="codeContainer"' + formData.ariaLabel + '><pre class="brush:'
				+ formData.selectBrush
				+ formData.textLines
				+ formData.firstLine
				+ formData.title
				+ '">' + formData.codeInput + '</pre></div><p>&nbsp;</p>';

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