const navigationBar = [
    {
        id: 1,
        title: "trang chủ",
        url: "halurestaurent/home",
        expand: null,
    },
    {
        id: 2,
        title: "giới thiệu",
        url: "halurestaurent/aboutUs",
        expand: null,
    },
    {
        id: 3,
        title: "sản phẩm",
        url: "halurestaurent/collections/all",
        expand: [
            {
                id: 31,
                title: "mới nhất",
                url: "halurestaurent/collections/new",
                expand: null,
            },
            {
                id: 32,
                title: "nội bật",
                url: "halurestaurent/collections/outstanding",
                expand: null,
            },
            {
                id: 33,
                title: "bán chạy",
                url: "halurestaurent/collections/hot",
                expand: null,
            },
        ],
    },
    {
        id: 4,
        title: "tin tức",
        url: "halurestaurent/news",
        expand: null,
    },
    {
        id: 5,
        title: "liên hệ",
        url: "halurestaurent/contact",
        expand: null,
    },
];

export default navigationBar;
