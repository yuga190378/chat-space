$(function(){
  function buildHTML(message){
    var messageImage = (message.image != null) ? `<img src="${message.image}" class="message__lower__image" >` : "";
    var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="message__upper">
          <div class="message__upper__user">
            ${message.user_name}
          </div>
          <div class="message__upper__date">
            ${message.date}
          </div>
        </div>
        <div class="message__lower">
          <p class="message__lower__content">
            ${message.content}
          </p>
        </div>
        ${messageImage}
      </div>`
    return html;
  }
  $('.js-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    return false;
  });
});