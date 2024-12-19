function PreviewComponent() {
    return (
        <>
            <p>
                각 질문 문항에 대해 체크해주세요
            </p>
            <div className="grid">
                <p>1. 기분이 가라앉거나, 우울하거나, 희망이 없다고 느꼈다.</p>
                <Likert
                    id="1"
                    responses={[
                        {value: 0, text: "전혀 그렇지 않다"},
                        {value: 1, text: "가끔 그렇다"},
                        {value: 2, text: "자주 그렇다"},
                        {value: 3, text: "거의 항상 그렇다"}
                    ]}
                    onChange={(val) => phq1.current = val["value"]}
                />
                &nbsp;
                <p>2. 평소 하던 일에 대한 흥미가 없어지거나 즐거움을 느끼지 못했다.</p>
                <Likert
                    id="2"
                    responses={[
                        {value: 0, text: "전혀 그렇지 않다"},
                        {value: 1, text: "가끔 그렇다"},
                        {value: 2, text: "자주 그렇다"},
                        {value: 3, text: "거의 항상 그렇다"}
                    ]}
                    onChange={(val) => phq2.current = val["value"]}

                />
                &nbsp;
                <p>3. 잠들기가 어렵거나 자주 깼다/혹은 너무 많이 잤다.</p>
                <Likert
                    id="3"
                    responses={[
                        {value: 0, text: "전혀 그렇지 않다"},
                        {value: 1, text: "가끔 그렇다"},
                        {value: 2, text: "자주 그렇다"},
                        {value: 3, text: "거의 항상 그렇다"}
                    ]}
                    onChange={(val) => phq3.current = val["value"]}

                />
                &nbsp;
                <p>4. 평소보다 식욕이 줄었다/혹은 평소보다 많이 먹었다.</p>
                <Likert
                    id="4"
                    responses={[
                        {value: 0, text: "전혀 그렇지 않다"},
                        {value: 1, text: "가끔 그렇다"},
                        {value: 2, text: "자주 그렇다"},
                        {value: 3, text: "거의 항상 그렇다"}
                    ]}
                    onChange={(val) => phq4.current = val["value"]}

                />
                &nbsp;
                <p>5. 다른 사람들이 눈치 챌 정도로 평소보다 말과 행동 이 느려졌다/혹은 너무 안절부절 못해서 가만히 앉아있을 수 없었다.</p>
                <Likert
                    id="5"
                    responses={[
                        {value: 0, text: "전혀 그렇지 않다"},
                        {value: 1, text: "가끔 그렇다"},
                        {value: 2, text: "자주 그렇다"},
                        {value: 3, text: "거의 항상 그렇다"}
                    ]}
                    onChange={(val) => phq5.current = val["value"]}

                />
                &nbsp;
                <p>6. 피곤하고 기운이 없었다.</p>
                <Likert
                    id="6"
                    responses={[
                        {value: 0, text: "전혀 그렇지 않다"},
                        {value: 1, text: "가끔 그렇다"},
                        {value: 2, text: "자주 그렇다"},
                        {value: 3, text: "거의 항상 그렇다"}
                    ]}
                    onChange={(val) => phq6.current = val["value"]}

                />
                &nbsp;
                <p>7. 내가 잘못 했거나, 실패했다는 생각이 들었다/혹은 자신과 가족을 실망시켰다고 생각했다.</p>
                <Likert
                    id="7"
                    responses={[
                        {value: 0, text: "전혀 그렇지 않다"},
                        {value: 1, text: "가끔 그렇다"},
                        {value: 2, text: "자주 그렇다"},
                        {value: 3, text: "거의 항상 그렇다"}
                    ]}
                    onChange={(val) => phq7.current = val["value"]}

                />
                &nbsp;
                <p>8. 신문을 읽거나 TV를 보는 것과 같은 일상적인 일에도 집중할 수가 없었다.</p>
                <Likert
                    id="8"
                    responses={[
                        {value: 0, text: "전혀 그렇지 않다"},
                        {value: 1, text: "가끔 그렇다"},
                        {value: 2, text: "자주 그렇다"},
                        {value: 3, text: "거의 항상 그렇다"}
                    ]}
                    onChange={(val) => phq8.current = val["value"]}

                />
                &nbsp;
                <p>9. 차라리 죽는 것이 더 낫겠다고 생각했다/혹은 자해할 생각을 했다.</p>
                <Likert
                    id="9"
                    responses={[
                        {value: 0, text: "전혀 그렇지 않다"},
                        {value: 1, text: "가끔 그렇다"},
                        {value: 2, text: "자주 그렇다"},
                        {value: 3, text: "거의 항상 그렇다"}
                    ]}
                    onChange={(val) => phq9.current = val["value"]}

                />
            </div>
        </>
    );
}