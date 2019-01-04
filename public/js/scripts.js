$(function () {
	$('#post-comment').hide();
	$('#btn-comment').on('click', function(event) {
		event.preventDefault();
		$('#post-comment').show();
	});

	$('#btn-like').on('click', function(event) {
		event.preventDefault();

		let imgId = $(this).data('id');

		$.post('/images/' + imgId + '/like').done(function(data) {
			$('.likes-count').text(data.likes);
	});

	$('#btn-delete').on('click', function(event) {

				event.preventDefault();
				let $this = $(this);

				const remove = confirm('Are you sure you want to delete this image?');
				if (remove) {
					let imgId = $(this).data('id');
					$.ajax ({
						url: '/images/' + imgId,
						type: 'DELETE'
					}).done(function(result) {
						if (result) {
							$this.removeClass('btn-danger').addClass('btn-success');
							$this.find('i').removeClass('fa-times').addClass('fa-check');
							$this.append('<span>Deleted!</span>');
						}
					});
				}
				console.log(this);
		});
});
});
