// Data loader para carrinhos - executado no servidor (SSR)
export const loader = async () => {
  try {
    // Buscar carrinhos e produtos em paralelo
    const [cartsResponse, productsResponse] = await Promise.all([
      fetch('https://fakestoreapi.com/carts?limit=4'),
      fetch('https://fakestoreapi.com/products')
    ]);

    if (!cartsResponse.ok || !productsResponse.ok) {
      throw new Error('Falha ao carregar dados');
    }

    const [carts, products] = await Promise.all([
      cartsResponse.json(),
      productsResponse.json()
    ]);

    // Criar um mapa de produtos por ID
    const productsMap = products.reduce((acc: { [key: number]: any }, product: any) => {
      acc[product.id] = product;
      return acc;
    }, {});

    return {
      carts,
      products: productsMap,
    };
  } catch (error) {
    console.error('Erro no data loader:', error);
    return {
      carts: [],
      products: {},
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};
