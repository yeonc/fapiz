const NOT_INFOMATION_TEXT =
  '정보가 없습니다. 상세 정보 수정 버튼을 눌러 정보를 입력해 보세요!'

const MyAdditionalInfoShowArea = ({ myAdditionalInfo }) => (
  <dl>
    <div>
      <dt>성별</dt>
      <dd>{myAdditionalInfo.gender ?? NOT_INFOMATION_TEXT}</dd>
    </div>
    <div>
      <dt>옷 스타일</dt>
      <dd>
        {myAdditionalInfo.fashionStyles.length === 0
          ? NOT_INFOMATION_TEXT
          : myAdditionalInfo.fashionStyles.map(
              fashionStyle => `${fashionStyle.name} `
            )}
      </dd>
    </div>
    <div>
      <dt>체형</dt>
      <dd>{myAdditionalInfo.bodyShape ?? NOT_INFOMATION_TEXT}</dd>
    </div>
  </dl>
)

export default MyAdditionalInfoShowArea
