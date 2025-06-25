-- 取引テーブル（収入・支出の両方を管理）
CREATE TABLE transactions (
    id BIGINT PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
    item VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの作成
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_type_date ON transactions(type, date);

-- サンプルデータの挿入（テスト用）
INSERT INTO transactions (id, type, item, amount, date) VALUES
(1654321234567, 'income', '給料', 250000.00, '2025-05-25'),
(1654321234568, 'income', '副業収入', 50000.00, '2025-05-20'),
(1654321234569, 'expense', '食費', 15000.00, '2025-05-26'),
(1654321234570, 'expense', '光熱費', 10000.00, '2025-05-27');
