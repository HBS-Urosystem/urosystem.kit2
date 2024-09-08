<script>
	export let comp
	export const ix = 0;

  console.log({comp})
</script>


<div class="collapse collapse-arrow">
  <input type="checkbox" name="details" /> 
  <p class="collapse-title">
    {comp.summary}
  </p>
  <div class="collapse-content text-sm"> 
    {@html comp.details}
  </div>
</div>

  <style>
    /*.collapse[open] > .collapse-title, .collapse-open > .collapse-title, .collapse:focus:not(.collapse-close) > .collapse-title, .collapse:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title, .collapse:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title {
      font-weight: bold;
    }*/
  </style>