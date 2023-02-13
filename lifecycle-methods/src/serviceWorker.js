const isLocalhost = Boolean(
    window.location.hostname === 'localhost' || 
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    export function register(config) {
        if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
            const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
            if (publicUrl.origin !== window.location.origin) {
                return;
            }

            window.addEventListener('load', () => {
                const swlUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
                if (isLocalhost) {
                    checkValidServiceWorker(swlUrl, config);
                    navigator.serviceWorker.ready.then(() => {
                        console.log(
                            'This web app is being served cache-first by a service ' +
                            'worker. To learn more, visit http://bit.ly/CRA-PWA.'
                            );
                        });
                        } else {
                            registerValidSW(swlUrl, config);
                        }
                    });
                }
            }

        function registerValidSW(swlUrl, config) {
            navigator.serviceWorker
                .register(swlUrl)
                .then(registration => {
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {

                                console.log(
                                    'New content is available and will be used when all ' +
                                    'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
                                 );
                                
                                 if (config && config.onUpdate) {
                                    config.onUpdate(registration);
                                 }
                                } else {
                                    console.log('Conent is cached for offline use.');

                                    if (config && config.onSuccess) {
                                        config.onSuccess(registration);
                                    }
                                }
                              }
                            };
                          };
                        })
                        .catch(error => {
                            console.error('Error during service worker registration.', error);
                        });
                    }

                    function checkValidServiceWorker(swlUrl, config) {
                        fetch(swlUrl)
                        .then(response => {
                            if(
                                response.status === 404 ||
                                response.headers.get('content-type').indexOf('javascript') === -1
                            ) {
                                navigator.serviceWorker.ready.then(response => {
                                    registration.unregister().then(() => {
                                        window.location.reload();
                                    });
                                });
                            } else {
                                registerValidSW(swlUrl, config);
                            }
                        })
                        .catch(() => {
                            console.log(
                                'No internet connection found. App is running in offline mode.'
                            );
                        });
                    }

                    export function unregister() {
                        if ('serviceWorker' in navigator) {
                            navigator.serviceWorker.ready.then(registration => {
                                registration.unregister();
                            });
                        }
                    }