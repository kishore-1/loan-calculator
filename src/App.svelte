<style lang="scss">
	@import 'global-stylesheet.scss';
	main {
		max-width: 400px;
		margin: 0 auto;
		padding: 3px;
		font-weight: 400;
	}
	.field {
		font-size: 16px;
		font-weight: 600;
	}
	.amount {
		padding: 10px;
		text-align: center;
		border-bottom: 1.5px solid #0000005d;

		.amount--value {
			font-size: 40px;
			font-weight: 600;
		}
	}
	.suggestion--interest {
		display: flex;
		padding: 10px 0;
		border-bottom: 1.5px solid #0000005d;

		.suggestion--interest__container {
			flex: 1;
			text-align: center;
			border-right: 3px solid #06213f;

			.suggestion--interest__percentage {
				font-size: 18px;
				font-weight: 600;
			}
			.suggestion--interest__value {
				color: #d4330b;
				font-size: 27px;
				font-weight: 600;
				overflow-wrap: anywhere;
			}
		}
		:last-child {
			border: none;
		}
	}
	.input--container {
		padding: 10px;
		font-size: 40px;
		position: relative;

		.input--value {
			width: 100%;
			border-bottom: 2px solid #0000005d;
			font-weight: 600;

			&::placeholder {
				color: #6373c2;
				opacity: 0.5;
			}
			&:focus {
				border-bottom-color: #000;
			}
		}
		.clear {
			position: absolute;
			top: 25%;
			right: 0;
			font-size: 30px;
			color: #ffbb0097;
		}
		.hide-clear {
			display: none;
		}
	}
	.suggestion--dues {
		display: flex;
		padding: 10px;
		text-align: center;
		font-size: 30px;

		.suggestion--dues__value {
			flex: 1;
			margin: 7px;
			color: #fff;
			background-color: #06213f;
			font-weight: 600;
		}
	}
</style>

<script>
	let principle, duration, interest, amount = 0;
	let interestSuggested = [{interestRate: 18, amount: 0},{interestRate: 24, amount: 0},{interestRate: 27, amount: 0}];
	let duesSuggested = [6,10,12,18,24];

	$: amount = calcAmount(principle, duration, interest)
	$: {
		interestSuggested.forEach((interest) => {
			interest.amount = calcAmount(principle, duration, interest.interestRate);
		})
		interestSuggested=interestSuggested;
	}

	function calcAmount(principle, duration, interest) {
		return principle && duration && interest 
				? ((principle * interest/100 * duration/12 + principle) / duration).toFixed(2) 
				: 0;
	}
</script>

<main>
	<div class="amount">
		<div class="field">
			Amount / Due
		</div>
		<div class="amount--value">
			{amount}
		</div>
	</div>
	<div class="suggestion--interest">
		{#each interestSuggested as interest (interest.interestRate)}
			<div class="suggestion--interest__container">
				<div class="suggestion--interest__percentage">
					{interest.interestRate}%
				</div>
				<div class="suggestion--interest__value">
					{interest.amount}
				</div>
			</div>
		{/each}
	</div>
	<div class="input--container">
		<input type=number class="input--value" bind:value={principle} placeholder="loan amount">
		<span class="fas fa-times {principle ? "clear" : "hide-clear"}" on:click={() => principle = null}></span>
	</div>
	<div class="input--container">
		<input type=number class="input--value" bind:value={duration} placeholder="number of dues">
		<span class="fas fa-times {duration ? "clear" : "hide-clear"}" on:click={() => duration = null}></span>
	</div>
	<div class="suggestion--dues">
		{#each duesSuggested as dues}
			<div class="suggestion--dues__value" on:click={() => duration = dues}>
				{dues}
			</div>
		{/each}
	</div>
	<div class="input--container">
		<input type=number class="input--value" bind:value={interest} placeholder="interest %">
		<span class="fas fa-times {interest ? "clear" : "hide-clear"}" on:click={() => interest = null}></span>
	</div>
</main>

