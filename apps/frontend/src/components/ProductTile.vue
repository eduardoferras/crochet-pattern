<template>
	<section class="product-tile">
		<AppContainer>
			<h2 class="product-tile__title">Últimos Lançamentos</h2>
			<div v-if="error" class="product-error">
				<Icon name="mdi:alert-circle-outline" size="24" />
				<p>Ops! Não conseguimos carregar os produtos no momento.</p>
			</div>
			<div v-else-if="pending" class="product-tile__title">Carregando produtos...</div>
			<ul v-else class="product-list">
				<li
					v-for="product in products"
					:key="product.id"
					class="product-card"
					data-test="product-card"
				>
					<div class="product-card__body">
						<AppImage
							:src="product.image"
							:alt="product.name"
							class="product-image"
							data-test="product-image"
						/>
						<div class="product-card__info">
							<h3 class="product-title">{{ product.name }}</h3>
							<span class="product-seller">por {{ product.seller.name }}</span>
							<span class="product-price" data-test="product-price">
								R$ {{ product.price.toFixed(2).replace('.', ',') }}
							</span>
							<span class="product-badge">produto digital</span>
						</div>
					</div>
					<div class="product-card__actions">
						<button class="btn btn--whatsapp" @click="handleWhatsAppClick(product)">
							<Icon name="mdi:whatsapp" color="white" size="24" />
							Comprar no WhatsApp
						</button>
					</div>
				</li>
			</ul>
		</AppContainer>
	</section>
</template>

<script lang="ts" setup>
import AppImage from './AppImage.vue'
import type Product from '@/types/Product'

const config = useRuntimeConfig()
const whatsAppSales = config.public.whatsAppSales
const gtm = useGtm()

const {
	data: products,
	pending,
	error
} = await useFetch(`${config.public.apiUrl}/products`, {
	key: 'products',
	lazy: true,
	transform: (res: { data: Product[] }) => res.data
})

function handleWhatsAppClick(product: Product) {
	gtm?.trackEvent({
		event: 'generate_lead',
		currency: 'BRL',
		value: product.price
	})

	const message = encodeURIComponent(`Olá, gostaria de saber mais sobre o produto ${product.name}`)
	const url = `https://wa.me/${whatsAppSales}?text=${message}`
	window.open(url, '_blank')
}
</script>

<style lang="scss" scoped>
.product {
	&-tile {
		&__title {
			font: 700 2rem / 1.2 $font-heading;
			margin-bottom: 1.6rem;
		}
	}

	&-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(33.1rem, 1fr));
		gap: 1.2rem;
	}

	&-card {
		background-color: #ffffff;
		border-radius: 1.2rem;
		padding: 1.2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.2rem;

		&__body {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 0.8rem;
			width: 100%;
		}

		&__info {
			display: flex;
			flex-direction: column;
			gap: 0.4rem;
		}

		&__actions {
			width: 100%;
		}

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1.2rem;
		}
	}

	&-image {
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 0.8rem;
		object-fit: cover;
	}

	&-title {
		font: 700 1.6rem / 1.2 $font-heading;
		color: #000000;
	}

	&-seller {
		font: 500 1.2rem / 1.2 $font-heading;
		color: #000000;
	}

	&-price {
		font: 700 2rem / 1.2 $font-heading;
		color: #f45d06;
	}

	&-badge {
		padding: 0.4rem 1.2rem;
		background-color: #d03838;
		color: #ffffff;
		font: 600 1.2rem / 1.2 $font-heading;
		border-radius: 0.4rem;
		width: fit-content;
	}

	&-error {
		grid-column: 1 / -1;
		text-align: center;
		padding: 2rem;
		border: 1px dashed rgba(0, 0, 0, 0.06);
		border-radius: 0.8rem;
		background-color: #fff8f2;
		color: #c53030;
		font-weight: 600;
		font-size: 1.2rem;
	}
}
</style>
