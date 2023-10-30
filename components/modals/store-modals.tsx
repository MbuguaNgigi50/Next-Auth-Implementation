/*
This is the store Modal. This is what will be seen when the user registers an account and initially logs in. 
If they do not have a store, they will be prompted to create a store.
The user cannot exit this page until they have made a store.
*/
'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

//Form validation with Zod
const formSchema = z.object({
	name: z.string().min(1),
});

export const StoreModal = () => {
	const storeModal = useStoreModal();

	//Defining the Hook for the Form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		//TODO CREATE THE STORE
	};

	return (
		<Modal
			title="Create Your Store"
			description="Add a new Store to manage your products"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
                <div className='space-y-4 py-2 pb-2'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='E-Commerce Store' {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button variant='outline' onClick={storeModal.onClose}>Cancel</Button>
                                <Button type='submit'>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
			</div>
		</Modal>
	);
};
