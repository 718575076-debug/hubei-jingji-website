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

// 产品详情数据
const productData = {
    '圆柱度仪 MMQ 400': {
        image: 'images/roundness-1-MMQ400-2.jpg',
        description: 'MMQ 400是一款专业的大型工件圆柱度测量仪，采用高精度传感器和先进的数据处理系统，适用于大型回转体工件的圆柱度、圆度、同轴度等形位误差测量。',
        specs: [
            { label: '测量范围', value: '直径400mm，高度500mm' },
            { label: '圆柱度误差', value: '≤0.5μm' },
            { label: '圆度误差', value: '≤0.3μm' },
            { label: '分辨率', value: '0.1μm' },
            { label: '主轴转速', value: '2-10r/min' },
            { label: '品牌', value: '德国马尔Mahr' }
        ],
        features: [
            '高精度测量，满足计量室级别要求',
            '大测量范围，适合大型工件',
            '专业分析软件，支持多种形位误差分析',
            '自动对中功能，简化操作流程',
            '数据导出功能，便于质量追溯'
        ]
    },
    '圆柱度仪 MMQ 200': {
        image: 'images/roundness-2-MMQ200.jpg',
        description: 'MMQ 200是一款紧凑型高精度圆柱度仪，适用于中小型工件的精密测量。配备先进的分析软件，提供全面的测量解决方案。',
        specs: [
            { label: '测量范围', value: '直径200mm，高度350mm' },
            { label: '圆柱度误差', value: '≤0.3μm' },
            { label: '圆度误差', value: '≤0.2μm' },
            { label: '分辨率', value: '0.1μm' },
            { label: '主轴转速', value: '2-15r/min' },
            { label: '品牌', value: '德国马尔Mahr' }
        ],
        features: [
            '紧凑设计，节省空间',
            '高精度测量，适合实验室使用',
            '友好软件界面，易于操作',
            '多种测量模式可选',
            '支持第三方校准'
        ]
    },
    '轮廓仪 MarSurf LD 140': {
        image: 'images/contour-2-LD140.jpg',
        description: 'MarSurf LD 140是一款高精度粗糙度轮廓综合测量仪，集成了粗糙度和轮廓测量功能，一机多用，提高测量效率。',
        specs: [
            { label: '轮廓测量范围', value: 'Z轴80mm，X轴140mm' },
            { label: '粗糙度测量范围', value: '350μm' },
            { label: '分辨率', value: '0.8nm' },
            { label: '测量力', value: '0.5-3mN' },
            { label: '导轨精度', value: '≤0.3μm/100mm' },
            { label: '品牌', value: '德国马尔Mahr' }
        ],
        features: [
            '粗糙度轮廓一体化测量',
            '高精度导轨，确保测量稳定性',
            '多种分析算法，符合ISO标准',
            '自动归零和校准功能',
            '支持多种探针规格'
        ]
    },
    '轮廓仪 MarSurf SD 140': {
        image: 'images/contour-1-SD140.jpg',
        description: 'MarSurf SD 140是马尔公司推出的高精度表面轮廓测量仪，采用扫描式测量技术，适用于复杂形状工件的精密测量。',
        specs: [
            { label: '测量范围', value: 'Z轴80mm，X轴140mm' },
            { label: '轮廓精度', value: '≤0.8μm/100mm' },
            { label: '分辨率', value: '1nm' },
            { label: '扫描速度', value: '0.1-2mm/s' },
            { label: '直线度', value: '≤0.3μm/100mm' },
            { label: '品牌', value: '德国马尔Mahr' }
        ],
        features: [
            '扫描式测量，适合复杂轮廓',
            '高分辨率，测量精度高',
            '多种扫描模式可选',
            '强大的分析软件',
            '支持GD&T形位公差分析'
        ]
    },
    '粗糙度轮廓仪一体机 LD 140': {
        image: 'images/contour-2-LD140.jpg',
        description: 'LD 140粗糙度轮廓仪一体机是德国马尔公司的明星产品，一台设备同时满足粗糙度和轮廓测量需求，是精密测量的理想选择。',
        specs: [
            { label: '测量类型', value: '粗糙度+轮廓' },
            { label: 'Z轴行程', value: '80mm' },
            { label: 'X轴行程', value: '140mm' },
            { label: '粗糙度Ra', value: '0.01-100μm' },
            { label: '分辨率', value: '0.8nm' },
            { label: '品牌', value: '德国马尔Mahr' }
        ],
        features: [
            '一机两用，节省成本',
            '高性价比，适合中小企业',
            '操作简便，上手快',
            '符合ISO/ASME/DIN等国际标准',
            '完善的售后服务'
        ]
    },
    '粗糙度轮廓仪一体机 SD 140': {
        image: 'images/contour-1-SD140.jpg',
        description: 'SD 140粗糙度轮廓仪一体机采用先进的传感器技术和智能分析算法，为用户提供高精度的表面质量检测方案。',
        specs: [
            { label: '测量类型', value: '粗糙度+轮廓' },
            { label: 'Z轴行程', value: '80mm' },
            { label: 'X轴行程', value: '140mm' },
            { label: '轮廓精度', value: '≤0.8μm' },
            { label: '测量力范围', value: '0.5-3mN' },
            { label: '品牌', value: '德国马尔Mahr' }
        ],
        features: [
            '高精度传感器',
            '智能评估算法',
            '丰富的报告模板',
            '支持定制化测量流程',
            '数据可追溯'
        ]
    },
    '粗糙度仪 XR1': {
        image: 'images/粗糙度仪-XR1.jpg',
        description: 'XR1是一款便携式高精度粗糙度测量仪，采用现代传感技术，适用于车间现场和实验室的各种表面粗糙度测量需求。',
        specs: [
            { label: '测量范围', value: 'Ra: 0.01-100μm' },
            { label: '测量参数', value: 'Ra, Rz, Rq, Rp, Rmax等' },
            { label: '分辨率', value: '0.01μm' },
            { label: '触针半径', value: '2μm/5μm可选' },
            { label: '测量力', value: '0.5mN' },
            { label: '品牌', value: '德国马尔Mahr' }
        ],
        features: [
            '便携式设计，适合现场使用',
            '彩色显示屏，数据清晰',
            '内置多种评估标准',
            '支持蓝牙数据传输',
            '超长续航能力'
        ]
    },
    '测高仪 817 CL': {
        image: 'images/测高仪-817 CL.jpg',
        description: '817 CL是马尔公司生产的高精度电子测高仪，用于精确测量工件的高度、厚度、槽深等尺寸参数，广泛应用于精密加工和检测领域。',
        specs: [
            { label: '测量范围', value: '0-1000mm' },
            { label: '分辨率', value: '1μm' },
            { label: '示值误差', value: '±2μm' },
            { label: '测量力', value: '1.0N±0.2N' },
            { label: '显示方式', value: 'LCD数字显示' },
            { label: '品牌', value: '德国马尔Mahr' }
        ],
        features: [
            '高精度测量，满足计量要求',
            '数显读数，避免人为误差',
            '多种测量模式',
            '数据输出接口',
            '可靠性和稳定性高'
        ]
    }
};

// 打开产品详情弹窗
function openProductModal(productName) {
    const product = productData[productName];
    if (!product) {
        alert('产品详情正在完善中，敬请期待！');
        return;
    }

    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = productName;
    document.getElementById('modalDesc').textContent = product.description;

    // 生成技术参数HTML
    let specsHtml = '';
    product.specs.forEach(spec => {
        specsHtml += `<div class="spec-item"><span>${spec.label}</span><span>${spec.value}</span></div>`;
    });
    document.getElementById('modalSpecs').innerHTML = specsHtml;

    // 生成主要功能HTML
    let featuresHtml = '';
    product.features.forEach(feature => {
        featuresHtml += `<li>${feature}</li>`;
    });
    document.getElementById('modalFeatures').innerHTML = featuresHtml;

    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 关闭弹窗
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 点击弹窗外部关闭
window.addEventListener('click', function(e) {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 为产品图片添加点击事件
document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const title = card.querySelector('h3').textContent;
            openProductModal(title);
        });
    });

    // 为产品卡片添加点击事件（点击整个卡片也可以打开）
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // 避免点击链接时触发
            if (e.target.classList.contains('product-link')) return;
            const title = this.querySelector('h3').textContent;
            openProductModal(title);
        });
    });
});
