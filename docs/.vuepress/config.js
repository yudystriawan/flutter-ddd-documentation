module.exports = {
    base: '/flutter-ddd-documentation/',
    title: 'Flutter DDD',
    description: 'Flutter Domain Driven Design Documentation',
    themeConfig: {
        sidebarDepth: 2,
        sidebar: {
            '/getting-started/': [
                ''
            ],
            '/architecture/': [
                '',
                'domain',
                'infrastructure',
                'application',
                'presentation'
            ],
            '/toc': [
                '',
                '/getting-started/',
                '/architecture/',
            ],
            // fallback
            '/': [
                '',        /* / */
                'contact', /* /contact.html */
                'about'    /* /about.html */
            ]
        }
    },
}