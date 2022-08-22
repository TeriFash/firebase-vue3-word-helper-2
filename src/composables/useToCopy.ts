import useClipboard from 'vue-clipboard3';

/**
 *
 * useToCopy methods copies the passed text to the clipboard;
 *
 * @param string initialValue string how need copy to clipboard
 *
 * @return call copyToClipboard() when to perform a copy action
 * */

export default async function useToCopy(initialValue: string) {
  try {
    const { toClipboard } = useClipboard();

    const text = await toClipboard(initialValue);
    return text;
  } catch (err) {
    console.log('✅ 🧊 ~ err', err);
  }

  // const copyToClipboard = async () => {
  //   try {
  //     await toClipboard(initialValue);
  //   } catch (err) {
  //     console.log('✅ 🧊 ~ err', err);
  //   }
  // };

  // return copyToClipboard();
}

export { useToCopy };
