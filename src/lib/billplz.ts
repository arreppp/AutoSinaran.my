import axios from 'axios'
import type { BillplzBillRequest, BillplzBillResponse } from '@/types'

export const BILLPLZ_CONFIG = {
  apiKey: import.meta.env.VITE_BILLPLZ_API_KEY as string,
  collectionId: import.meta.env.VITE_BILLPLZ_COLLECTION_ID as string,
  sandboxMode: import.meta.env.VITE_BILLPLZ_SANDBOX === 'true',
  baseUrl:
    import.meta.env.VITE_BILLPLZ_SANDBOX === 'true'
      ? 'https://www.billplz-sandbox.com/api'
      : 'https://www.billplz.com/api',
}

export async function createBill(
  params: BillplzBillRequest
): Promise<BillplzBillResponse> {
  // In production replace this proxy route with a real backend endpoint.
  // The backend must call BillPlz and verify x_signature — never expose the API key here.
  const response = await axios.post<BillplzBillResponse>(
    '/api/billplz/bills',
    params
  )
  return response.data
}

// Mock bill creation for frontend-only dev
export async function createBillMock(
  params: BillplzBillRequest
): Promise<BillplzBillResponse> {
  await new Promise((r) => setTimeout(r, 800))
  const mockId = `mock_${Date.now()}`
  const appBase = import.meta.env.VITE_APP_BASE_URL ?? 'http://localhost:5173'
  const redirectUrl = new URL(params.redirect_url)
  redirectUrl.searchParams.set('billplz[id]', mockId)
  redirectUrl.searchParams.set('billplz[paid]', 'true')
  redirectUrl.searchParams.set('billplz[x_signature]', 'mock_sig')

  return {
    id: mockId,
    collection_id: params.collection_id,
    paid: false,
    state: 'due',
    amount: params.amount,
    paid_amount: 0,
    due_at: new Date(Date.now() + 3600000).toISOString(),
    email: params.email,
    mobile: params.mobile,
    name: params.name,
    url: `${appBase}/payment/mock?redirect=${encodeURIComponent(redirectUrl.toString())}`,
    reference_1: params.reference_1,
  }
}
