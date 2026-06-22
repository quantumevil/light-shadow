function initGallery() {
    const humanitiesImages = [
        { file: "image1.jpeg", title: "人像", desc: "广角低机位拍摄，彰显人物的张力。" },
        { file: "image2.jpeg", title: "人像", desc: "长焦拍摄，彰显人物表情神态。" },
        { file: "image3.jpeg", title: "人像·抬头", desc: "抓拍抬头的一瞬。" },
        { file: "image4.jpg",  title: "人像·眼神光", desc: "阳光打在面部，显出眼神光。" },
        { file: "image16.jpeg", title: "纪实", desc: "工业与自然的同框。" }
    ];
    const landscapeImages = [
        { file: "image5.jpeg",  title: "古今交融", desc: "什刹海，古今建筑融合。" },
        { file: "image6.jpeg",  title: "云层", desc: "云层层次丰富。" },
        { file: "image7.jpeg",  title: "城市风光", desc: "弯曲的路作为引导线。" },
        { file: "image8.jpeg",  title: "古今对比", desc: "老城门对角线构图。" },
        { file: "image9.jpeg",  title: "花团锦簇", desc: "冷暖对比，旋焦效果。" },
        { file: "image10.png",  title: "哈曼蓝", desc: "哈曼蓝凤凰胶片拍摄。" },
        { file: "image11.jpeg", title: "中轴线", desc: "北京中轴线对称构图。" },
        { file: "image12.JPG",  title: "日出", desc: "日出时刻云层与海面。" },
        { file: "image13.jpeg", title: "角楼", desc: "长曝光拍摄角楼。" },
        { file: "image14.jpeg", title: "风力发电机", desc: "风力发电机剪影。" },
        { file: "image15.jpeg", title: "幽静", desc: "斑驳木门与草地呼应。" }
    ];

    function renderGallery(containerId, images) {
        var container = document.getElementById(containerId);
        if (!container) return;
        images.forEach(function(img) {
            var item = document.createElement("div");
            item.className = "gallery-item";
            var imgEl = document.createElement("img");
            imgEl.src = "images_gallery/" + img.file;
            imgEl.alt = img.title;
            item.appendChild(imgEl);
            container.appendChild(item);
        });
    }

    renderGallery("gallery-humanities", humanitiesImages);
    renderGallery("gallery-landscape", landscapeImages);

    // 导航栏
    var navbar = document.getElementById("navbar");
    function updateNavbar() {
        if (window.scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    }
    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();

    // 平滑滚动
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight, behavior: "smooth" });
            }
        });
    });

    // 灯箱
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightbox-img");
    var lightboxCaption = document.getElementById("lightbox-caption");
    document.querySelector(".lightbox-close").addEventListener("click", function() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
        lightboxImg.src = "";
    });
    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox) { lightbox.classList.remove("active"); document.body.style.overflow = ""; lightboxImg.src = ""; }
    });
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && lightbox.classList.contains("active")) { lightbox.classList.remove("active"); document.body.style.overflow = ""; lightboxImg.src = ""; }
    });

    // 用事件委托处理图片点击
    document.getElementById("gallery").addEventListener("click", function(e) {
        var img = e.target.closest(".gallery-item img");
        if (img) {
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = "<h3 style='color:#c9a96e;margin-bottom:8px'>" + img.alt + "</h3>";
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGallery);
} else {
    initGallery();
}