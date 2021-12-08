$(function() {

	// 点击 URL 选项卡
	$('#md5-tab').on('click', function() {
		$('.content-head-section').removeClass('active');
		$('.content-section').removeClass('active');
		$('.md5-content-head-section').addClass('active');
		$('.string-content-section').addClass('active');
	});

	$('#encode-md5-upper-case').on('click', function() {
		let sourceText = $('#string-source').val();
		try {
			let targetText = md5(sourceText).toUpperCase();
			$('#string-target').val(targetText);
		} catch (err) {
			console.error(err);
			$('#string-target').val("格式不正确");
		}
	});

	$('#encode-md5-lower-case').on('click', function() {
		let sourceText = $('#string-source').val();
		try {
			let targetText = md5(sourceText);
			$('#string-target').val(targetText);
		} catch (err) {
			console.error(err);
			$('#string-target').val("格式不正确");
		}
	});

});