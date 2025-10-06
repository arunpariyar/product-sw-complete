export default function generateImageUrl(filename: string) {
  const baseUrl =
    "https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/ui/assets/images/";
  return baseUrl + filename;
}
