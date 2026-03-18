// 导航栏滚动效果
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // 移动端菜单切换
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动时更新导航链接激活状态
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// 产品分类筛选
const catBtns = document.querySelectorAll('.cat-btn');
const productCards = document.querySelectorAll('.product-card');

catBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 更新按钮状态
        catBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.getAttribute('data-cat');
        
        // 筛选产品
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 播放主视频
function playMainVideo() {
    const video = document.getElementById('mainVideo');
    if (video) {
        video.scrollIntoView({ behavior: 'smooth', block: 'center' });
        video.play();
    }
}

// 视频播放弹窗（保留用于其他用途）
function playVideo(element) {
    const modal = document.getElementById('videoModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 点击弹窗背景关闭
document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeVideoModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
});

// 下载处理
function handleDownload(e, filename) {
    e.preventDefault();
    showToast(`正在准备下载：${filename}`);
    
    // 模拟下载延迟
    setTimeout(() => {
        showToast(`${filename} 下载已开始`);
    }, 1500);
}

// Toast 提示
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 联系表单提交
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    
    showToast('正在提交您的咨询...');
    
    // 使用 fetch 提交到 FormSubmit
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => {
        if (response.ok) {
            showToast('提交成功！我们会尽快与您联系');
            form.reset();
        } else {
            showToast('提交失败，请稍后重试或直接拨打电话');
        }
    })
    .catch(error => {
        showToast('网络错误，请直接拨打电话 175-0713-0764');
        console.error('Form submission error:', error);
    });
});

// 滚动动画
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .solution-card, .case-card, .download-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 初始化动画样式
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .solution-card, .case-card, .download-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // 初始检查
    animateOnScroll();
});

// 滚动时触发动画
window.addEventListener('scroll', animateOnScroll);

// 数字计数动画
function animateNumbers() {
    const numbers = document.querySelectorAll('.highlight-num, .years');
    
    numbers.forEach(num => {
        const target = parseInt(num.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                num.textContent = target + (num.textContent.includes('+') ? '+' : '') + (num.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                num.textContent = Math.floor(current) + (num.textContent.includes('+') ? '+' : '') + (num.textContent.includes('%') ? '%' : '');
            }
        }, 16);
    });
}

// 当关于我们区域进入视口时触发数字动画
const aboutSection = document.querySelector('.about');
let numbersAnimated = false;

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !numbersAnimated) {
            animateNumbers();
            numbersAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// 汉堡菜单动画
const hamburger = document.getElementById('hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        const bars = this.querySelectorAll('.bar');
        
        if (this.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        }
    });
}

// 案例1轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('#case1Slider .slider-img');
const dots = document.querySelectorAll('#case1Slider .dot');

function goToSlide(index) {
    // 移除当前激活状态
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // 设置新的当前幻灯片
    currentSlide = index;
    
    // 添加新的激活状态
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// 自动轮播
function autoSlide() {
    let nextSlide = (currentSlide + 1) % slides.length;
    goToSlide(nextSlide);
}

// 每3秒自动切换
if (slides.length > 0) {
    setInterval(autoSlide, 3000);
}

// 案例2轮播图功能
let currentSlide2 = 0;
const slides2 = document.querySelectorAll('#case2Slider .slider-img');
const dots2 = document.querySelectorAll('#case2Slider .dot');

function goToSlide2(index) {
    // 移除当前激活状态
    slides2[currentSlide2].classList.remove('active');
    dots2[currentSlide2].classList.remove('active');
    
    // 设置新的当前幻灯片
    currentSlide2 = index;
    
    // 添加新的激活状态
    slides2[currentSlide2].classList.add('active');
    dots2[currentSlide2].classList.add('active');
}

// 自动轮播案例2
function autoSlide2() {
    let nextSlide = (currentSlide2 + 1) % slides2.length;
    goToSlide2(nextSlide);
}

// 每3秒自动切换案例2
if (slides2.length > 0) {
    setInterval(autoSlide2, 3000);
}

// 马尔展厅轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    let currentShowroomSlide = 0;
    const showroomSlides = document.querySelectorAll('#showroomSlider .slider-img');
    const showroomDots = document.querySelectorAll('#showroomDots .dot');

    function goToShowroomSlide(index) {
        if (showroomSlides.length === 0) return;
        showroomSlides[currentShowroomSlide].classList.remove('active');
        showroomDots[currentShowroomSlide].classList.remove('active');
        currentShowroomSlide = index;
        showroomSlides[currentShowroomSlide].classList.add('active');
        showroomDots[currentShowroomSlide].classList.add('active');
    }

    function autoShowroomSlide() {
        let nextSlide = (currentShowroomSlide + 1) % showroomSlides.length;
        goToShowroomSlide(nextSlide);
    }

    // 每3秒自动切换马尔展厅
    if (showroomSlides.length > 0) {
        setInterval(autoShowroomSlide, 3000);
    }
});

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
