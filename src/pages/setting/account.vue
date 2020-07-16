<route>
{
  "meta": {
    "title": "账户",
    "icon": "mdi-account-circle"
  }
}
</route>

<script>
import login from './__components__/login'

export default {
  render (h) {
    const node =
      <div>
        <login/>
      </div>
    return node
  }
}
</script>
