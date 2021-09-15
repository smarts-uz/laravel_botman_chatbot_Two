$(function(){
    // First register any plugins
    $.fn.filepond.registerPlugin(
        FilePondPluginImagePreview
    );

    loadFilePond();

    // Create FilePond element
    $(document).on('click', '.fp1', function() {
        $.ajax({
            url: 'https://codepen.io/veur/pen/PoodZXR.html'
        }).then(function(data) {
            $('.pond1').html(data);
            loadFilePond();
        });
    });

    // Create second FilePond element
    $(document).on('click', '.fp2', function(e) {
        $('.pond2').html(`<input type="file" 
      class="filepond"
      name="filepond" 
      multiple 
      data-allow-image-edit="false"
      data-max-file-size="3MB"
      data-max-files="3">`);

        loadFilePond();
    });
});

// Turn input element into a pond
function loadFilePond() {
    $('body input.filepond:not(.filepond--browser)').each(function(){
        $($(this)).filepond({
            allowMultiple: true,
            server:{
                process: {
                    url: '/api',
                    onload: function(e){
                        alert(e);
                    }
                }
            },
            onaddfile: (err, item) => {
                console.log('file added event', err, item);
            }
        });
    });
}
