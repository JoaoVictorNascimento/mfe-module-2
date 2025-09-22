// Data loader para usuários - executado no servidor (SSR)
export const loader = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/users?limit=6');
    if (!response.ok) {
      throw new Error('Falha ao carregar usuários');
    }
    const users = await response.json();
    return {
      users,
    };
  } catch (error) {
    console.error('Erro no data loader:', error);
    return {
      users: [],
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};
