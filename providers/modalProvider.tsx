/*
This is the Modal Provider. This will allow for a Modal to be called in the entire application and not just in a particular page.
This is called at the Layout.tsx file to ensure it is in the whole application.
*/

//This is a client component
'use client';

//Importing the Store Modal
import { StoreModal } from '@/components/modals/store-modals';
//Importing useEffect and useState from react
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
	//These are the variables that will store the mounted state
	const [isMounted, setIsMounted] = useState(false);

	//This checks if the modal is mounted
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<StoreModal />
		</>
	);
};
