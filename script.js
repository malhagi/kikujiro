const fortunes = [
    "오늘은 행운이 가득한 날입니다. 새로운 기회가 찾아올 것입니다.",
    "조심스러운 하루가 될 것입니다. 중요한 결정은 내일로 미루세요.",
    "금전운이 좋은 날입니다. 예상치 못한 수입이 생길 수 있습니다.",
    "인간관계가 원만해질 것입니다. 오래된 친구와의 만남이 있을 수 있습니다.",
    "건강에 특별히 신경 써야 할 날입니다. 충분한 휴식을 취하세요.",
    "학업이나 업무에서 좋은 성과를 거둘 수 있는 날입니다.",
    "여행이나 새로운 경험을 할 수 있는 기회가 올 것입니다.",
    "가족과의 관계가 더욱 돈독해질 것입니다.",
    "창의력이 뛰어난 날입니다. 새로운 아이디어가 떠오를 것입니다.",
    "도전적인 하루가 될 것입니다. 하지만 결과는 좋을 것입니다."
];

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
    const fortuneIndex = day % fortunes.length;
    
    // 운세 결과 표시
    resultDiv.innerHTML = `
        <h3>${name}님의 오늘의 운세</h3>
        <p>${fortunes[fortuneIndex]}</p>
        <p>행운의 숫자: ${Math.floor(Math.random() * 9) + 1}</p>
    `;
} 