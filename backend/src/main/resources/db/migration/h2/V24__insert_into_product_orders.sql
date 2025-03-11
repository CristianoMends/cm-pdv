INSERT INTO product_orders (order_id, product_id, quantity, unit_price, total)
SELECT
    1, p.product_id, 3, p.price, 3 * p.price FROM Products p WHERE p.product_id = 1   -- Pedido 1: 3 unidades do produto com ID 1
UNION ALL
SELECT
    2, p.product_id, 1, p.price, 1 * p.price FROM Products p WHERE p.product_id = 2   -- Pedido 2: 1 unidade do produto com ID 2
UNION ALL
SELECT
    3, p.product_id, 5, p.price, 5 * p.price FROM Products p WHERE p.product_id = 3   -- Pedido 3: 5 unidades do produto com ID 3
UNION ALL
SELECT
    4, p.product_id, 2, p.price, 2 * p.price FROM Products p WHERE p.product_id = 4   -- Pedido 4: 2 unidades do produto com ID 4
UNION ALL
SELECT
    5, p.product_id, 4, p.price, 4 * p.price FROM Products p WHERE p.product_id = 5   -- Pedido 5: 4 unidades do produto com ID 5
UNION ALL
SELECT
    6, p.product_id, 6, p.price, 6 * p.price FROM Products p WHERE p.product_id = 6   -- Pedido 6: 6 unidades do produto com ID 6
UNION ALL
SELECT
    7, p.product_id, 1, p.price, 1 * p.price FROM Products p WHERE p.product_id = 7;  -- Pedido 7: 1 unidade do produto com ID 7


INSERT INTO product_orders (order_id, product_id, quantity, unit_price, total)
SELECT
    8, p.product_id, 2, p.price, 2 * p.price FROM Products p WHERE p.product_id = 1   -- Pedido 8: 2 unidades do produto com ID 1
UNION ALL
SELECT
    9, p.product_id, 1, p.price, 1 * p.price FROM Products p WHERE p.product_id = 2   -- Pedido 9: 1 unidade do produto com ID 2
UNION ALL
SELECT
    10, p.product_id, 3, p.price, 3 * p.price FROM Products p WHERE p.product_id = 3  -- Pedido 10: 3 unidades do produto com ID 3
UNION ALL
SELECT
    11, p.product_id, 4, p.price, 4 * p.price FROM Products p WHERE p.product_id = 4   -- Pedido 11: 4 unidades do produto com ID 4
UNION ALL
SELECT
    12, p.product_id, 2, p.price, 2 * p.price FROM Products p WHERE p.product_id = 5   -- Pedido 12: 2 unidades do produto com ID 5
UNION ALL
SELECT
    13, p.product_id, 6, p.price, 6 * p.price FROM Products p WHERE p.product_id = 6   -- Pedido 13: 6 unidades do produto com ID 6
UNION ALL
SELECT
    14, p.product_id, 3, p.price, 3 * p.price FROM Products p WHERE p.product_id = 7   -- Pedido 14: 3 unidades do produto com ID 7
UNION ALL
SELECT
    15, p.product_id, 4, p.price, 4 * p.price FROM Products p WHERE p.product_id = 8   -- Pedido 15: 4 unidades do produto com ID 8
UNION ALL
SELECT
    16, p.product_id, 5, p.price, 5 * p.price FROM Products p WHERE p.product_id = 9   -- Pedido 16: 5 unidades do produto com ID 9
UNION ALL
SELECT
    17, p.product_id, 2, p.price, 2 * p.price FROM Products p WHERE p.product_id = 10; -- Pedido 17: 2 unidades do produto com ID 10
