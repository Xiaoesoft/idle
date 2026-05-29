// 学校配置信息
const schoolConfig = {
    'wust': {
        name: '武汉科技大学',
        // 请替换为实际的在线图片链接
        qrUrl: 'https://img.cdn1.vip/i/6a18f7eb6a418_1780021227.webp'
    },
    'hubei-tcm': {
        name: '湖北中医药大学',
        // 请替换为实际的在线图片链接
        qrUrl: 'https://img.cdn1.vip/i/6a18f8056d08e_1780021253.webp'
    },
    'whgsu': {
        name: '武汉工商学院',
        // 请替换为实际的在线图片链接
        qrUrl: 'https://img.cdn1.vip/i/6a18f7eb5153d_1780021227.webp'
    },
    'whjtu': {
        name: '武汉交通职业学院',
        // 请替换为实际的在线图片链接
        qrUrl: 'https://img.cdn1.vip/i/6a18f7eb62fab_1780021227.webp'
    }
};

// 获取DOM元素
const modal = document.getElementById('qrModal');
const modalTitle = document.getElementById('modalTitle');
const qrImage = document.getElementById('qrImage');
const lastUpdate = document.getElementById('lastUpdate');
const closeBtn = document.querySelector('.close-btn');
const schoolCards = document.querySelectorAll('.school-card');

// 显示二维码弹窗
function showQRCode(schoolKey) {
    const school = schoolConfig[schoolKey];
    if (!school) {
        alert('未找到该学校的二维码信息');
        return;
    }

    modalTitle.textContent = school.name + '闲置交易群';
    
    // 设置图片加载错误处理
    qrImage.onerror = function() {
        this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f5f5f5"/><text x="50%" y="45%" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle">二维码待上传</text><text x="50%" y="55%" font-family="Arial" font-size="16" fill="%23ff6b6b" text-anchor="middle">请联系管理员更新</text></svg>';
        lastUpdate.textContent = '图片加载失败';
    };
    
    // 直接设置在线图片URL
    qrImage.src = school.qrUrl;
    
    // 显示当前日期作为更新时间
    const date = new Date();
    lastUpdate.textContent = date.toLocaleDateString('zh-CN');

    modal.style.display = 'block';
}

// 关闭弹窗
function closeModal() {
    modal.style.display = 'none';
}

// 绑定点击事件
schoolCards.forEach(card => {
    card.addEventListener('click', function() {
        const schoolKey = this.getAttribute('data-school');
        showQRCode(schoolKey);
    });
});

// 关闭按钮点击事件
closeBtn.addEventListener('click', closeModal);

// 点击弹窗外部关闭
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});
