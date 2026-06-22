document.addEventListener("DOMContentLoaded", () => {
    // ==================== 图片数据 ====================
    // 人文类 (slides 1-4 + slide 16)
    const humanitiesImages = [
        { file: "image1.jpeg", title: "人像",
          desc: "广角低机位拍摄，彰显人物的张力。光面和暗面既有明暗对比也有冷暖对比。" },
        { file: "image2.jpeg", title: "人像",
          desc: "长焦拍摄，彰显人物表情神态。光面和暗面明暗对比，突出人物面部和动作。" },
        { file: "image3.jpeg", title: "人像·抬头",
          desc: "抓拍抬头的一瞬，面光展现人物面部细节。" },
        { file: "image4.jpg",  title: "人像·眼神光",
          desc: "阳光打在面部，显出面部轮廓细节和眼神光。" },
        { file: "image16.jpeg", title: "纪实",
          desc: "工业与自然的同框，通过鸟的姿态，让人反思自然与发展的平衡。" }
    ];

    // 风光类 (slides 5-15)
    const landscapeImages = [
        { file: "image5.jpeg",  title: "古今交融",
          desc: "拍摄于什刹海，用长焦拍摄，将现代的中国尊等建筑与古代建筑融合在一起，海与天在黄昏下冷暖对比。" },
        { file: "image6.jpeg",  title: "云层",
          desc: "云层的层次丰富，前景有枯枝衬托出氛围。" },
        { file: "image7.jpeg",  title: "城市风光",
          desc: "中间以弯曲的路作为引导线，展现了现代的城市风光。" },
        { file: "image8.jpeg",  title: "古今对比",
          desc: "老城门作为前景，中间的路形成对角线构图，突出古今的对比。" },
        { file: "image9.jpeg",  title: "花团锦簇",
          desc: "花团锦簇，有树枝做前景遮挡，背景的树叶与花冷暖对比，大光圈出现类似旋焦的效果。" },
        { file: "image10.png",  title: "哈曼蓝",
          desc: "使用哈曼蓝凤凰胶片拍摄，展现出深沉的蓝色风格。" },
        { file: "image11.jpeg", title: "中轴线",
          desc: "以北京中轴线对称构图，利用滤镜，显示出克制鲜活的色调。" },
        { file: "image12.JPG",  title: "日出",
          desc: "日出时刻，云层和海面具有丰富的层次。" },
        { file: "image13.jpeg", title: "角楼",
          desc: "长曝光拍摄的角楼，但时间不够，水面不够光滑。" },
        { file: "image14.jpeg", title: "风力发电机",
          desc: "远方的风力发电机剪影，与丰富的云层和近处细节。" },
        { file: "image15.jpeg", title: "幽静",
          desc: "斑驳的木门与背后的草地呼应，展现幽静的氛围。" }
    ];

    // ==================== 渲染图片作品集 ====================
    const galleryBasePath = "../images_gallery/";

    function renderGallery(containerId, images) {
        const container = document.getElementById(containerId);
        if (!container) return;

        images.forEach((img, index) => {
            const item = document.createElement("div");
            item.className = "gallery-item";

            const imgEl = document.createElement("img");
            imgEl.src = galleryBasePath + img.file;
            imgEl.alt = img.title;
            imgEl.loading = "lazy";

            item.appendChild(imgEl);

            // 点击打开灯箱
            item.addEventListener("click", () => {
                openLightbox(galleryBasePath + img.file, img.title, img.desc);
            });

            container.appendChild(item);
        });
    }

    renderGallery("gallery-humanities", humanitiesImages);
    renderGallery("gallery-landscape", landscapeImages);

    // ==================== 灯箱 ====================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.querySelector(".lightbox-close");

    function openLightbox(src, title, desc) {
        lightboxImg.src = src;
        lightboxCaption.innerHTML = '<h3 style="color:#c9a96e;margin-bottom:8px;font-size:1.2rem;">' + title + '</h3><p>' + desc + '</p>';
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
        setTimeout(() => {
            lightboxImg.src = "";
        }, 400);
    }

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) closeLightbox();
    });

    // ==================== 导航栏滚动效果 ====================
    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();

    // ==================== 导航链接平滑滚动 ====================
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        });
    });

    // ==================== 页面加载动画 ====================
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

    setTimeout(() => {
        document.querySelectorAll(".gallery-item").forEach((item, i) => {
            item.style.opacity = "0";
            item.style.animationDelay = (i % 4) * 0.1 + "s";
            galleryObserver.observe(item);
        });
    }, 100);
});
