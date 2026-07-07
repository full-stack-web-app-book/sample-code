-- 取引テーブル（収入・支出の両方を管理）
CREATE TABLE transactions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item VARCHAR(20) NOT NULL,
    amount INTEGER NOT NULL,
    date DATE NOT NULL
);

-- インデックスの作成
CREATE INDEX idx_transactions_date ON transactions(date);
