INSERT INTO orders (customer_id, delivery_status, paid_amount, total, balance, payment_method, created_at, finished_at, canceled_at, description)
VALUES
    (1, 'PENDING', 200.00, 200.00, 0, 'MONEY', '2025-02-06 18:39:51', NULL, NULL, 'Pedido de Camisetas e Bonecos Geek'),
    (1, 'PENDING', 350.00, 350.00, 0, 'MONEY', '2025-02-06 18:39:52', NULL, NULL, 'Pedido de Colecionáveis Marvel e DC Comics'),
    (1, 'PENDING', 120.00, 120.00, 0, 'MONEY', '2025-02-06 18:39:53', NULL, NULL, 'Pedido de Luminária Star Wars cancelado'),
    (1, 'PENDING', 75.00, 75.00, 0, 'MONEY', '2025-03-08 18:39:54', NULL, NULL, 'Pedido de acessórios Geek'),
    (1, 'PENDING', 450.00, 450.00, 0, 'MONEY', '2025-03-06 18:39:55', NULL, NULL, 'Pedido de livros e quadrinhos Star Wars'),
    (1, 'PENDING', 180.00, 180.00, 0, 'MONEY', '2025-03-07 18:39:56', NULL, NULL, 'Pedido de Mochila Geek e Funko Pop!'),
    (1, 'PENDING', 99.90, 99.90, 0, 'MONEY', '2025-03-06 18:39:57', NULL, NULL, 'Pedido de chaveiro Pokémon e camiseta Marvel');


INSERT INTO orders (customer_id, delivery_status, paid_amount, total, balance, payment_method, created_at, finished_at, canceled_at, description)
VALUES
    (2, 'PENDING', 250.00, 250.00, 0, 'CREDIT', '2025-03-06 18:40:00', NULL, NULL, 'Pedido de camisetas e acessórios de Star Wars'),
    (2, 'PENDING', 150.00, 150.00, 0, 'DEBIT', '2025-03-06 18:40:01', NULL, NULL, 'Pedido de Funko Pop! e chaveiros Geek'),
    (2, 'PENDING', 350.00, 350.00, 0, 'MONEY', '2025-03-06 18:40:02', NULL, NULL, 'Pedido de livros de quadrinhos Marvel'),
    (2, 'PENDING', 100.00, 100.00, 0, 'CREDIT', '2025-03-06 18:40:03', NULL, NULL, 'Pedido de camisetas temáticas Marvel'),
    (3, 'PENDING', 220.00, 220.00, 0, 'DEBIT', '2025-03-06 18:40:04', NULL, NULL, 'Pedido de action figures Star Wars'),
    (3, 'PENDING', 300.00, 300.00, 0, 'MONEY', '2025-03-06 18:40:05', NULL, NULL, 'Pedido de Funko Pop! DC Comics'),
    (3, 'PENDING', 50.00, 50.00, 0, 'CREDIT', '2025-03-06 18:40:06', NULL, NULL, 'Pedido de chaveiro da Marvel'),
    (3, 'PENDING', 420.00, 420.00, 0, 'DEBIT', '2025-03-06 18:40:07', NULL, NULL, 'Pedido de livros e action figures Marvel'),
    (4, 'PENDING', 180.00, 180.00, 0, 'MONEY', '2025-03-06 18:40:08', NULL, NULL, 'Pedido de mochilas e acessórios Marvel'),
    (4, 'PENDING', 110.00, 110.00, 0, 'CREDIT', '2025-03-06 18:40:09', NULL, NULL, 'Pedido de camiseta e boneco Funko Pop!'),
    (4, 'PENDING', 330.00, 330.00, 0, 'DEBIT', '2025-03-06 18:40:10', NULL, NULL, 'Pedido de colecionáveis de Star Wars'),
    (5, 'PENDING', 180.00, 180.00, 0, 'MONEY', '2025-03-06 18:40:11', NULL, NULL, 'Pedido de boneco Star Wars e acessórios'),
    (5, 'PENDING', 200.00, 200.00, 0, 'DEBIT', '2025-03-06 18:40:12', NULL, NULL, 'Pedido de boneco de ação Marvel');