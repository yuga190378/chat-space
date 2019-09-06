$(function(){
  function buildHTML(message){
    var messageContent = (message.content != null) ? `<p class="message__lower__content">${message.content}</p>` : "";
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
          ${messageContent}
          ${messageImage}
        </div>
      </div>`
    return html;
  };


  function reloadMessages(){
    last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = insertHTML + buildHTML(message);
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
    });
  };

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

  var controller = $('body').data('controller');
  var action = $('body').data('action');
  if (controller == "messages" && action == "index") {
    setInterval(reloadMessages, 5000);
  };
});