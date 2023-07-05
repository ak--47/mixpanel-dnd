<script>
  const ping = () => {
    fetch("/ping")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  ping();
</script>


  