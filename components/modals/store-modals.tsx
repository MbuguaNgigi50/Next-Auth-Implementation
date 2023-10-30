/*
This is the store Modal. This is what will be seen when the user registers an account and initially logs in. 
If they do not have a store, they will be prompted to create a store.
The user cannot exit this page until they have made a store.
*/
'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"

export const StoreModal = () => {
    const storeModal = useStoreModal();

        return(
    <Modal
        title="Create Your Store"
        description="Add a new Store to manage your products"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        Create Stores Form
        </Modal>
        )

}