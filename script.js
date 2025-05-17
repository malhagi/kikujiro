const fortunes = {
    // 사주팔자 운세
    destiny: [
        "목(木)의 기운이 강한 사주로, 창의력과 리더십이 뛰어납니다.",
        "화(火)의 기운이 강한 사주로, 열정과 추진력이 뛰어납니다.",
        "토(土)의 기운이 강한 사주로, 안정성과 신뢰성이 뛰어납니다.",
        "금(金)의 기운이 강한 사주로, 결단력과 실행력이 뛰어납니다.",
        "수(水)의 기운이 강한 사주로, 지혜와 통찰력이 뛰어납니다."
    ],
    
    // 자녀운
    children: [
        "자녀운이 매우 좋은 시기입니다. 자녀와의 관계가 더욱 돈독해질 것입니다.",
        "자녀 교육에 좋은 시기입니다. 자녀의 재능을 발견할 수 있는 기회가 올 것입니다.",
        "자녀와의 소통이 원활해질 것입니다. 서로의 마음을 더 잘 이해하게 될 것입니다.",
        "자녀의 건강에 특별히 신경 써야 할 시기입니다. 충분한 관심이 필요합니다.",
        "자녀의 학업운이 좋은 시기입니다. 좋은 성과를 거둘 수 있을 것입니다."
    ],
    
    // 건강운
    health: [
        "건강운이 매우 좋은 시기입니다. 활력이 넘치는 날들이 이어질 것입니다.",
        "스트레스 관리에 신경 써야 할 시기입니다. 충분한 휴식이 필요합니다.",
        "운동을 통해 건강을 증진할 수 있는 좋은 시기입니다.",
        "식생활 관리가 중요한 시기입니다. 균형 잡힌 영양 섭취가 필요합니다.",
        "정신 건강에 특별히 신경 써야 할 시기입니다. 마음의 안정을 찾는 것이 중요합니다."
    ],
    
    // 재물운
    wealth: [
        "재물운이 매우 좋은 시기입니다. 예상치 못한 수입이 생길 수 있습니다.",
        "투자나 사업에 좋은 시기입니다. 신중한 판단이 필요합니다.",
        "재물 관리에 신경 써야 할 시기입니다. 불필요한 지출을 줄이는 것이 좋습니다.",
        "새로운 수입원을 찾을 수 있는 기회가 올 것입니다.",
        "재물운이 안정적인 시기입니다. 꾸준한 수입이 예상됩니다."
    ]
};

// 간지 배열
const ganji = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];

function getFortune() {
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const resultDiv = document.getElementById('fortune-result');

    if (!name || !birthdate) {
        resultDiv.innerHTML = '<p style="color: red;">이름과 생년월일을 모두 입력해주세요.</p>';
        return;
    }

    // 생년월일을 기반으로 운세 선택
    const birthDate = new Date(birthdate);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();
    
    // 사주팔자 계산
    const destinyIndex = (year + month + day) % fortunes.destiny.length;
    const childrenIndex = (year + day) % fortunes.children.length;
    const healthIndex = (month + day) % fortunes.health.length;
    const wealthIndex = (year + month) % fortunes.wealth.length;
    
    // 간지 계산
    const ganjiIndex = (year + month + day) % ganji.length;
    
    // 운세 결과 표시
    resultDiv.innerHTML = `
        <h3>${name}님의 오늘의 운세</h3>
        <div class="fortune-section">
            <h4>사주팔자 운세</h4>
            <p>${fortunes.destiny[destinyIndex]}</p>
            <p>오늘의 간지: ${ganji[ganjiIndex]}일</p>
        </div>
        <div class="fortune-section">
            <h4>자녀운</h4>
            <p>${fortunes.children[childrenIndex]}</p>
        </div>
        <div class="fortune-section">
            <h4>건강운</h4>
            <p>${fortunes.health[healthIndex]}</p>
        </div>
        <div class="fortune-section">
            <h4>재물운</h4>
            <p>${fortunes.wealth[wealthIndex]}</p>
        </div>
        <div class="fortune-section">
            <h4>행운의 숫자</h4>
            <p>${Math.floor(Math.random() * 9) + 1}</p>
        </div>
    `;
} 