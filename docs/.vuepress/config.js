module.exports = {
    base: '/flutter-ddd-documentation/',
    title: 'Flutter DDD',
    description: 'Flutter Domain Driven Design Documentation',
    themeConfig: {
        // sidebarDepth: 2,
        sidebar: [
            {
                title: 'Getting Started',
                path: '/getting-started/',
                collapsable: false,
                sidebarDepth: 2,
            },
            {
                title: 'Architecture',
                path: '/architecture/',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    'architecture/domain',
                    'architecture/infrastructure',
                    'architecture/application',
                    'architecture/presentation',
                ]
            },
        ]
        // sidebar: {
        // '/getting-started/': [
        //     ''
        // ],
        // '/architecture/': [
        //     '',
        //     'domain',
        //     'infrastructure',
        //     'application',
        //     'presentation'
        // ],
        // '/toc': [
        //     '',
        //     '/getting-started/',
        //     '/architecture/',
        // ],
        // // fallback
        // '/': [
        //     '',        /* / */
        //     'contact', /* /contact.html */
        //     'about'    /* /about.html */
        // ]
        // }
    },
}