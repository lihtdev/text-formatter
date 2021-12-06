$(function() {
	$('#format-btn').on('click', function() {
		let sourceText = $('#source').val();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 4);
			$('#target').val(targetText);
		} catch (err) {
			console.error(err);
			$('#target').val("JSON格式不正确");
		}
	});

	$('#compress-btn').on('click', function() {
		let sourceText = $('#source').val();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 0);
			$('#target').val(targetText);
		} catch (err) {
			console.error(err);
			$('#target').val("JSON格式不正确");
		}
	});

	$('#compress-and-escape-btn').on('click', function() {
		let sourceText = $('#source').val();
		try {
			let sourceObj = JSON.parse(sourceText);
			let targetText = JSON.stringify(sourceObj, null, 0);
			targetText = JSON.stringify(targetText);
			$('#target').val(targetText);
		} catch (err) {
			console.error(err);
			$('#target').val("JSON格式不正确");
		}
	});

	$('#remove-escape-btn').on('click', function() {
		let sourceText = $('#source').val();
		try {
			let sourceObj = JSON.parse(sourceText);
			$('#target').val(sourceObj);
		} catch (err) {
			console.error(err);
			$('#target').val("JSON格式不正确");
		}
	});

});