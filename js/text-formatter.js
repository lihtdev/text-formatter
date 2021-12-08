$(function() {

	var sourceTextArea = CodeMirror.fromTextArea($('#source')[0], {
	  lineNumbers: true,
	  tabSize: 4
	});

	var targetTextArea = CodeMirror.fromTextArea($('#target')[0], {
	  lineNumbers: true,
	  tabSize: 4
	});


	// 格式化
	$('#format-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 4);
			targetTextArea.setValue(targetText);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue("JSON格式不正确");
		}
	});

	// 压缩
	$('#compress-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 0);
			targetTextArea.setValue(targetText);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue("JSON格式不正确");
		}
	});

	// 压缩转义
	$('#compress-and-escape-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 0);
			targetText = JSON.stringify(targetText);
			targetTextArea.setValue(targetText);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue("JSON格式不正确");
		}
	});

	// 去除转义
	$('#remove-escape-btn').on('click', function() {
		let sourceText = sourceTextArea.getValue();
		try {
			let sourceObj = JSON.parse(sourceText);
			targetTextArea.setValue(sourceObj);
		} catch (err) {
			console.error(err);
			targetTextArea.setValue("JSON格式不正确");
		}
	});

	// 切换选项卡
	$('.tab').on('click', function() {
		$('.tab').removeClass('active');
		$(this).addClass('active');
	});

});