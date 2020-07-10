$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="messages__box">
          <div class="messages__box__intro">
            <div class="messages__intro__name">
              ${message.user_name}
            </div>
            <div class="messages__intro__date">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__box">
            <p class="message.content">
              ${message.content}
            </p>
            <img class="message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="messages__box">
        <div class="messages__box__intro">
          <div class="messages__box__intro__name">
            ${message.user_name}
          </div>
          <div class="messages__intro__date">
            ${message.created_at}
          </div>
        </div>
        <div class="messages__coments">
          <p class="message.content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);      
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.Form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});