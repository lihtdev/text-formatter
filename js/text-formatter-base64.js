$(function() {

	// 点击 URL 选项卡
	$('#base64-tab').on('click', function() {
		$('.content-head-section').removeClass('active');
		$('.content-section').removeClass('active');
		$('.base64-content-head-section').addClass('active');
		$('.string-content-section').addClass('active');
	});

	$('#encode-base64').on('click', function() {
		let sourceText = $('#string-source').val();
		try {
			let targetText = Base64.encode(sourceText);
			$('#string-target').val(targetText);
		} catch (err) {
			console.error(err);
			$('#string-target').val("格式不正确");
		}
	});

	$('#decode-base64').on('click', function() {
		let sourceText = $('#string-source').val();
		try {
			let targetText = Base64.decode(sourceText);
			$('#string-target').val(targetText);
		} catch (err) {
			console.error(err);
			$('#string-target').val("格式不正确");
		}
	});

});