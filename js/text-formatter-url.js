$(function() {

	// 点击 URL 选项卡
	$('#url-tab').on('click', function() {
		$('.content-head-section').removeClass('active');
		$('.content-section').removeClass('active');
		$('.url-content-head-section').addClass('active');
		$('.string-content-section').addClass('active');
	});

	$('.url-btn').on('click', function() {
		let fun = $(this).data('fun');
		let urlSourceText = $('#string-source').val();
		try {
			let urlTargetText = eval(fun + "('" + urlSourceText + "')");
			$('#string-target').val(urlTargetText);
		} catch (err) {
			console.error(err);
			$('#string-target').val("URL格式不正确");
		}
	});

});