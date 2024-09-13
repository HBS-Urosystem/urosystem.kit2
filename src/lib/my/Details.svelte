<script>
	export let comp
	export const ix = 0;

  //console.log(comp)
</script>


<div id="{comp.anchor}" class="collapse collapse-arrow">
    <input type="radio" name="details" /> 
  <h4 class="collapse-title">
    {comp.summary}
  </h4>
  <div class="collapse-content"> 
    {@html comp.text}
  </div>
</div>

<style>
  /*.collapse[open] > .collapse-title, .collapse-open > .collapse-title, .collapse:focus:not(.collapse-close) > .collapse-title, .collapse:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title, .collapse:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title {
    font-weight: bold;
  }*/
  .collapse {
    max-width: 64ch;
    margin-inline: auto;
    margin-block: var(--gap);
    /*overflow-x: visible;*/
  }
  .collapse-title {
    margin-block: 0;
    /*max-width: 64ch;*/
    /*width: max-content;*/
    /*text-align: center;*/
  }
  /*.collapse-title, */:where(.collapse > input[type="checkbox"]), :where(.collapse > input[type="radio"]) {
    width: 100%;
  }
  .collapse[open] > :where(.collapse-content), .collapse-open > :where(.collapse-content), .collapse:focus:not(.collapse-close) > :where(.collapse-content), .collapse:not(.collapse-close) > :where(input[type="checkbox"]:checked ~ .collapse-content), .collapse:not(.collapse-close) > :where(input[type="radio"]:checked ~ .collapse-content) {
    padding-bottom: 0;
  }
  input {
    height: auto;
  }

</style>