import useClipboard from 'vue-clipboard3';
import { ref, reactive } from 'vue';
/**
 *
 * useToCopy methods copies the passed text to the clipboard;
 *
 * @param string initialValue string how need copy to clipboard
 *
 * @return call copyToClipboard() when to perform a copy action
 * */

export default async function useToCopy(initialValue: string, refer: any) {
  try {
    const { toClipboard } = useClipboard();
    const textRes = await toClipboard(initialValue, refer);
    // const waypointText = reactive({ textRes });

    return textRes;
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

const { toClipboard } = useClipboard();

export { useToCopy, toClipboard };
