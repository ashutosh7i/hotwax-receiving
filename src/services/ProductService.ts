import { api, hasError } from '@/adapter';
import { getCurrentFacilityId } from '@/utils';

const fetchProducts = async (query: any): Promise <any> => {
  return api({
    url: "searchProducts",
    method: "post",
    data: query,
    cache: true
  })
}

const getInventoryAvailableByFacility = async (productId: any): Promise<any> => {
  let productQoh = ''
  const payload = {
    productId: productId,
    facilityId: getCurrentFacilityId()
  }

  try {
    const resp: any = await api({
      url: "service/getInventoryAvailableByFacility",
      method: "post",
      data: payload
    })
    if (!hasError(resp)) {
      productQoh = resp?.data.quantityOnHandTotal;
    } else {
      throw resp.data;
    }
  } catch (err) {
    console.error(err)
  } 
  return productQoh;
}

export const ProductService = {
  fetchProducts,
  getInventoryAvailableByFacility
}