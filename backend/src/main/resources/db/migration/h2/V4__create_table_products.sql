CREATE TABLE products (
    product_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    cost NUMERIC(10,2) NOT NULL,
    unit VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    category_id BIGINT,
    ncm varchar,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    active boolean,
    image varchar,
    PRIMARY KEY (product_id),
    FOREIGN KEY (category_id) REFERENCES product_category (id)
);
