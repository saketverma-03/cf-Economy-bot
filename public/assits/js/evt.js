document.body.addEventListener('htmx:responseError', function (evt) {
    console.log(evt.detail.xhr.status);
    if (evt.detail.xhr.status === 401) {
        console.log('redirect to login page');
        window.location = '/';
    }
});
