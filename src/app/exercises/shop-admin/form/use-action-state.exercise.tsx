'use client'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React, {startTransition, useActionState} from 'react'
import {CategoriesEnum, Product} from '@/lib/type'

//🐶 Remplace cet import par `onSubmitAction`
import {onSubmitAction} from '../actions'
import {toast} from 'sonner'
import {FormSchemaType, formSchema} from '../schema'

export default function ProductForm({product}: {product?: Product}) {
  // 🐶 Utilise le Hook 'useActionState' avec 'onSubmitAction'
  const [state, formAction, isPending] = useActionState(onSubmitAction, {
    success: true,
  })
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product?.id ?? '',
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 0,
      category: product?.category ?? CategoriesEnum.default,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    },
  })

  const categories = Object.keys(CategoriesEnum).filter((key) =>
    Number.isNaN(Number(key))
  )

  async function handleSubmitAction(values: FormSchemaType) {
    // ⛏️ Supprime tout ce code et remplace le par un appel à `formAction(formData)`
    const formData = new FormData()
    for (const key in values) {
      // 📑 https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
      formData.append(key, values[key as keyof typeof values] as string)
    }
    startTransition(() => formAction(formData))
  }

  React.useEffect(() => {
    const success = state.success
    if (success) {
      toast(`Product saved`)
      form.reset({
        id: '',
        createdAt: new Date().toISOString(),
        quantity: 10,
        category: CategoriesEnum.default,
        title: '',
        description: '',
        price: 0,
      })
    } else {
      for (const error of state?.errors ?? []) {
        form.setError(error.field, {type: 'manual', message: error.message})
      }
      toast.error(state.message ?? 'Error')
    }
  }, [form, state, state?.success])
  React.useEffect(() => {
    form.reset({
      id: product?.id ?? '',
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 10,
      category: product?.category ?? undefined,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    })
  }, [form, product])

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(handleSubmitAction)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product title</FormLabel>
              <FormControl>
                <Input placeholder="ex : Iphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="199" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Product quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Buttons isPending={isPending} />
        </div>
      </form>
    </Form>
  )
}
const Buttons = ({isPending}: {isPending: boolean}) => {
  return (
    <>
      <Button size="sm" type="submit" disabled={isPending}>
        Save
      </Button>
      <Button size="sm" variant="outline">
        Cancel
      </Button>
    </>
  )
}
