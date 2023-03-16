import { Stack, useColorModeValue } from '@chakra-ui/react';

const AppLogo = ({
  style = {},
  isSmall,
}: {
  style?: any;
  isSmall?: boolean;
}) => {
  const color = useColorModeValue('#000', '#fff');

  if (isSmall)
    return (
      <Stack
        aria-label="Voucher Vault"
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        sx={{
          background: 'primary.600',
          width: '40px',
          height: '40px',
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        <span>VV</span>
      </Stack>
    );

  return (
    <svg
      width="130"
      height="40"
      viewBox="0 0 90 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: '100px', ...style }}
    >
      <path
        d="M4.17603 12L1.10703 4.3H2.85603L4.46203 8.469C4.55003 8.69633 4.62337 8.898 4.68203 9.074C4.74803 9.24267 4.80303 9.404 4.84703 9.558C4.89837 9.70467 4.94603 9.85133 4.99003 9.998C5.03403 10.1373 5.07803 10.2913 5.12203 10.46L4.80303 10.471C4.8617 10.2437 4.92037 10.0347 4.97903 9.844C5.0377 9.646 5.1037 9.44067 5.17703 9.228C5.25037 9.01533 5.34203 8.76233 5.45203 8.469L6.97003 4.3H8.70803L5.61703 12H4.17603ZM12.3558 12.11C11.7912 12.11 11.2705 12.011 10.7938 11.813C10.3172 11.615 9.89916 11.34 9.53982 10.988C9.18782 10.6287 8.91649 10.207 8.72582 9.723C8.53516 9.23167 8.43982 8.7 8.43982 8.128C8.43982 7.54867 8.53516 7.02067 8.72582 6.544C8.91649 6.06 9.18782 5.63833 9.53982 5.279C9.89916 4.91967 10.3172 4.641 10.7938 4.443C11.2705 4.245 11.7912 4.146 12.3558 4.146C12.9278 4.146 13.4485 4.245 13.9178 4.443C14.3945 4.641 14.8088 4.91967 15.1608 5.279C15.5202 5.63833 15.7952 6.06 15.9858 6.544C16.1765 7.028 16.2718 7.556 16.2718 8.128C16.2718 8.7 16.1765 9.228 15.9858 9.712C15.7952 10.196 15.5202 10.6177 15.1608 10.977C14.8088 11.3363 14.3945 11.615 13.9178 11.813C13.4485 12.011 12.9278 12.11 12.3558 12.11ZM12.3558 10.548C12.6785 10.548 12.9755 10.4893 13.2468 10.372C13.5255 10.2547 13.7638 10.086 13.9618 9.866C14.1598 9.646 14.3138 9.38933 14.4238 9.096C14.5412 8.80267 14.5998 8.48 14.5998 8.128C14.5998 7.776 14.5412 7.45333 14.4238 7.16C14.3138 6.86667 14.1598 6.61367 13.9618 6.401C13.7638 6.181 13.5255 6.01233 13.2468 5.895C12.9755 5.77033 12.6785 5.708 12.3558 5.708C12.0332 5.708 11.7362 5.77033 11.4648 5.895C11.1935 6.01233 10.9552 6.181 10.7498 6.401C10.5445 6.61367 10.3868 6.86667 10.2768 7.16C10.1742 7.45333 10.1228 7.776 10.1228 8.128C10.1228 8.48 10.1742 8.80267 10.2768 9.096C10.3868 9.38933 10.5445 9.646 10.7498 9.866C10.9552 10.086 11.1935 10.2547 11.4648 10.372C11.7362 10.4893 12.0332 10.548 12.3558 10.548ZM20.3832 12.066C19.7598 12.066 19.2025 11.9377 18.7112 11.681C18.2272 11.417 17.8458 11.0577 17.5672 10.603C17.2885 10.141 17.1492 9.62033 17.1492 9.041V4.289H18.8102V8.942C18.8102 9.25 18.8798 9.52867 19.0192 9.778C19.1585 10.02 19.3455 10.2143 19.5802 10.361C19.8222 10.5077 20.0898 10.581 20.3832 10.581C20.6838 10.581 20.9552 10.5077 21.1972 10.361C21.4465 10.2143 21.6408 10.02 21.7802 9.778C21.9268 9.52867 22.0002 9.25 22.0002 8.942V4.289H23.6062V9.041C23.6062 9.62033 23.4668 10.141 23.1882 10.603C22.9095 11.0577 22.5245 11.417 22.0332 11.681C21.5492 11.9377 20.9992 12.066 20.3832 12.066ZM28.3674 12.11C27.8027 12.11 27.282 12.0147 26.8054 11.824C26.336 11.626 25.9254 11.351 25.5734 10.999C25.2287 10.6397 24.961 10.218 24.7704 9.734C24.5797 9.24267 24.4844 8.70733 24.4844 8.128C24.4844 7.56333 24.5834 7.04267 24.7814 6.566C24.9794 6.082 25.258 5.664 25.6174 5.312C25.9767 4.95267 26.3984 4.674 26.8824 4.476C27.3664 4.278 27.8907 4.179 28.4554 4.179C28.822 4.179 29.1814 4.23033 29.5334 4.333C29.8927 4.42833 30.219 4.57133 30.5124 4.762C30.813 4.95267 31.0697 5.18 31.2824 5.444L30.2484 6.588C30.0724 6.412 29.889 6.26167 29.6984 6.137C29.515 6.005 29.317 5.906 29.1044 5.84C28.899 5.76667 28.679 5.73 28.4444 5.73C28.129 5.73 27.832 5.78867 27.5534 5.906C27.282 6.02333 27.0437 6.18833 26.8384 6.401C26.633 6.60633 26.468 6.85933 26.3434 7.16C26.226 7.45333 26.1674 7.77967 26.1674 8.139C26.1674 8.50567 26.226 8.83933 26.3434 9.14C26.4607 9.43333 26.6257 9.68633 26.8384 9.899C27.051 10.1043 27.304 10.2657 27.5974 10.383C27.898 10.493 28.228 10.548 28.5874 10.548C28.822 10.548 29.0494 10.515 29.2694 10.449C29.4894 10.383 29.691 10.2913 29.8744 10.174C30.065 10.0567 30.2337 9.921 30.3804 9.767L31.1834 11.054C31.0074 11.252 30.769 11.4317 30.4684 11.593C30.175 11.7543 29.845 11.8827 29.4784 11.978C29.1117 12.066 28.7414 12.11 28.3674 12.11ZM36.8753 12V4.3H38.5253V12H36.8753ZM32.0243 12V4.3H33.6743V12H32.0243ZM32.6843 8.909L32.6953 7.413H37.7223V8.909H32.6843ZM39.9822 12V4.3H45.1852V5.752H41.5882V10.548H45.2622V12H39.9822ZM40.7522 8.777V7.369H44.6572V8.777H40.7522ZM46.4146 12V4.3H49.8246C50.3012 4.3 50.7339 4.41 51.1226 4.63C51.5112 4.84267 51.8156 5.13233 52.0356 5.499C52.2629 5.86567 52.3766 6.28367 52.3766 6.753C52.3766 7.215 52.2629 7.63667 52.0356 8.018C51.8156 8.392 51.5112 8.689 51.1226 8.909C50.7339 9.129 50.3012 9.239 49.8246 9.239H48.0096V12H46.4146ZM50.7816 12L48.8236 8.524L50.5176 8.249L52.6956 12.011L50.7816 12ZM48.0096 7.897H49.7476C49.9456 7.897 50.1179 7.853 50.2646 7.765C50.4186 7.66967 50.5359 7.54133 50.6166 7.38C50.6972 7.21133 50.7376 7.02433 50.7376 6.819C50.7376 6.599 50.6899 6.40833 50.5946 6.247C50.4992 6.08567 50.3599 5.961 50.1766 5.873C49.9932 5.77767 49.7806 5.73 49.5386 5.73H48.0096V7.897Z"
        fill={color}
      />
      <path
        d="M58.5128 12L55.4328 4.3H57.3798L58.8648 8.227C58.9528 8.45433 59.0261 8.65233 59.0848 8.821C59.1508 8.98967 59.2058 9.14733 59.2498 9.294C59.3011 9.44067 59.3451 9.591 59.3818 9.745C59.4258 9.89167 59.4734 10.0603 59.5248 10.251H59.1838C59.2424 10.0017 59.3011 9.78167 59.3598 9.591C59.4184 9.393 59.4844 9.19133 59.5578 8.986C59.6311 8.77333 59.7228 8.52033 59.8328 8.227L61.2628 4.3H63.1768L60.0748 12H58.5128ZM61.8317 12L64.8787 4.3H66.4627L69.4877 12H67.5957L66.1437 8.095C66.085 7.941 66.0263 7.776 65.9677 7.6C65.909 7.424 65.8503 7.24433 65.7917 7.061C65.733 6.87033 65.6743 6.687 65.6157 6.511C65.5643 6.32767 65.5203 6.159 65.4837 6.005L65.8137 5.994C65.7697 6.17733 65.7183 6.357 65.6597 6.533C65.6083 6.709 65.5533 6.885 65.4947 7.061C65.4433 7.22967 65.3847 7.402 65.3187 7.578C65.2527 7.74667 65.1903 7.92267 65.1317 8.106L63.6797 12H61.8317ZM63.2837 10.526L63.8667 9.118H67.4087L67.9807 10.526H63.2837ZM72.9285 12.066C72.2905 12.066 71.7222 11.9377 71.2235 11.681C70.7249 11.417 70.3325 11.0577 70.0465 10.603C69.7679 10.1483 69.6285 9.62767 69.6285 9.041V4.3H71.5205V8.942C71.5205 9.22067 71.5829 9.47367 71.7075 9.701C71.8322 9.921 72.0009 10.097 72.2135 10.229C72.4262 10.3537 72.6645 10.416 72.9285 10.416C73.2072 10.416 73.4529 10.3537 73.6655 10.229C73.8855 10.097 74.0615 9.921 74.1935 9.701C74.3255 9.47367 74.3915 9.22067 74.3915 8.942V4.3H76.2175V9.041C76.2175 9.62767 76.0745 10.1483 75.7885 10.603C75.5099 11.0577 75.1212 11.417 74.6225 11.681C74.1239 11.9377 73.5592 12.066 72.9285 12.066ZM77.5447 12V4.3H79.4147V10.35H82.8467V12H77.5447ZM84.446 12V5.95H82.158V4.3H88.659V5.95H86.316V12H84.446Z"
        fill="#5200FF"
      />
      <path
        d="M36.7061 21.05C36.5294 21.05 36.3628 21.025 36.2061 20.975C36.0494 20.925 35.9061 20.85 35.7761 20.75C35.6461 20.65 35.5311 20.5267 35.4311 20.38L35.7011 20.08C35.8578 20.3033 36.0178 20.46 36.1811 20.55C36.3478 20.64 36.5344 20.685 36.7411 20.685C36.8911 20.685 37.0278 20.66 37.1511 20.61C37.2744 20.56 37.3711 20.49 37.4411 20.4C37.5111 20.31 37.5461 20.2067 37.5461 20.09C37.5461 20.0133 37.5328 19.945 37.5061 19.885C37.4828 19.825 37.4461 19.7717 37.3961 19.725C37.3461 19.6783 37.2844 19.6367 37.2111 19.6C37.1378 19.5633 37.0528 19.53 36.9561 19.5C36.8628 19.47 36.7578 19.44 36.6411 19.41C36.4711 19.37 36.3211 19.3233 36.1911 19.27C36.0644 19.2133 35.9561 19.145 35.8661 19.065C35.7794 18.985 35.7128 18.8933 35.6661 18.79C35.6228 18.6833 35.6011 18.5583 35.6011 18.415C35.6011 18.2783 35.6294 18.1517 35.6861 18.035C35.7461 17.9183 35.8278 17.8183 35.9311 17.735C36.0344 17.6483 36.1561 17.5817 36.2961 17.535C36.4361 17.4883 36.5861 17.465 36.7461 17.465C36.9261 17.465 37.0861 17.49 37.2261 17.54C37.3694 17.5867 37.4961 17.6567 37.6061 17.75C37.7161 17.8433 37.8111 17.955 37.8911 18.085L37.6161 18.355C37.5461 18.245 37.4661 18.15 37.3761 18.07C37.2894 17.99 37.1928 17.93 37.0861 17.89C36.9828 17.8467 36.8678 17.825 36.7411 17.825C36.5944 17.825 36.4644 17.85 36.3511 17.9C36.2411 17.95 36.1544 18.02 36.0911 18.11C36.0278 18.1967 35.9961 18.2967 35.9961 18.41C35.9961 18.4933 36.0111 18.5683 36.0411 18.635C36.0711 18.6983 36.1178 18.755 36.1811 18.805C36.2478 18.8517 36.3328 18.895 36.4361 18.935C36.5428 18.9717 36.6694 19.0067 36.8161 19.04C36.9894 19.08 37.1444 19.1283 37.2811 19.185C37.4211 19.2417 37.5394 19.31 37.6361 19.39C37.7361 19.4667 37.8111 19.5567 37.8611 19.66C37.9144 19.7633 37.9411 19.8817 37.9411 20.015C37.9411 20.2217 37.8894 20.4033 37.7861 20.56C37.6828 20.7133 37.5378 20.8333 37.3511 20.92C37.1678 21.0067 36.9528 21.05 36.7061 21.05ZM38.3131 21L39.6531 17.5H40.0981L41.4281 21H41.0031L40.1481 18.73C40.1248 18.6667 40.0981 18.5933 40.0681 18.51C40.0414 18.4233 40.0114 18.335 39.9781 18.245C39.9481 18.1517 39.9181 18.0617 39.8881 17.975C39.8614 17.8883 39.8364 17.8117 39.8131 17.745H39.9131C39.8864 17.8283 39.8581 17.9133 39.8281 18C39.8014 18.0833 39.7731 18.1683 39.7431 18.255C39.7131 18.3383 39.6831 18.4217 39.6531 18.505C39.6231 18.5883 39.5931 18.6717 39.5631 18.755L38.7131 21H38.3131ZM38.8831 20.035L39.0281 19.655H40.6831L40.8431 20.035H38.8831ZM42.6314 21L41.2764 17.5H41.7164L42.5864 19.78C42.6264 19.8833 42.6614 19.975 42.6914 20.055C42.7214 20.135 42.748 20.2117 42.7714 20.285C42.798 20.355 42.823 20.425 42.8464 20.495C42.8697 20.565 42.8947 20.6417 42.9214 20.725L42.7914 20.73C42.8247 20.6167 42.8564 20.5117 42.8864 20.415C42.9197 20.3183 42.953 20.22 42.9864 20.12C43.023 20.0167 43.068 19.8967 43.1214 19.76L43.9864 17.5H44.4264L43.0314 21H42.6314ZM45.0398 21V17.5H47.1598V17.88H45.4298V20.62H47.1498V21H45.0398ZM45.2198 19.39V19.01H46.8798V19.39H45.2198ZM50.8293 21.05C50.5827 21.05 50.3543 21.0067 50.1443 20.92C49.9377 20.83 49.756 20.705 49.5993 20.545C49.446 20.385 49.326 20.1967 49.2393 19.98C49.156 19.76 49.1143 19.52 49.1143 19.26C49.1143 19 49.156 18.7617 49.2393 18.545C49.326 18.325 49.446 18.135 49.5993 17.975C49.756 17.8117 49.9377 17.6867 50.1443 17.6C50.3543 17.51 50.5827 17.465 50.8293 17.465C51.0793 17.465 51.3077 17.51 51.5143 17.6C51.7243 17.6867 51.906 17.8117 52.0593 17.975C52.216 18.135 52.336 18.325 52.4193 18.545C52.506 18.7617 52.5493 19 52.5493 19.26C52.5493 19.5167 52.506 19.755 52.4193 19.975C52.336 20.1917 52.216 20.3817 52.0593 20.545C51.906 20.705 51.7243 20.83 51.5143 20.92C51.3077 21.0067 51.0793 21.05 50.8293 21.05ZM50.8293 20.665C51.0193 20.665 51.1943 20.6317 51.3543 20.565C51.5177 20.495 51.6577 20.3967 51.7743 20.27C51.891 20.1433 51.981 19.995 52.0443 19.825C52.111 19.6517 52.1443 19.4633 52.1443 19.26C52.1443 19.0533 52.111 18.865 52.0443 18.695C51.981 18.5217 51.891 18.3717 51.7743 18.245C51.6577 18.1183 51.5177 18.02 51.3543 17.95C51.1943 17.88 51.0193 17.845 50.8293 17.845C50.6393 17.845 50.4627 17.88 50.2993 17.95C50.1393 18.02 50.001 18.1183 49.8843 18.245C49.7677 18.3717 49.6777 18.5217 49.6143 18.695C49.551 18.865 49.5193 19.0533 49.5193 19.26C49.5193 19.4633 49.551 19.6517 49.6143 19.825C49.6777 19.995 49.7677 20.1433 49.8843 20.27C50.001 20.3967 50.1393 20.495 50.2993 20.565C50.4627 20.6317 50.6393 20.665 50.8293 20.665ZM53.2851 21V17.5H53.6401L55.9301 20.53L55.8601 20.62C55.8501 20.5667 55.8418 20.4867 55.8351 20.38C55.8318 20.2733 55.8268 20.1533 55.8201 20.02C55.8168 19.8833 55.8135 19.7417 55.8101 19.595C55.8068 19.4483 55.8035 19.305 55.8001 19.165C55.8001 19.025 55.8001 18.8983 55.8001 18.785V17.5H56.1901V21H55.8251L53.5451 18.01L53.6051 17.905C53.6151 18.0383 53.6235 18.17 53.6301 18.3C53.6401 18.43 53.6468 18.555 53.6501 18.675C53.6568 18.795 53.6618 18.905 53.6651 19.005C53.6685 19.105 53.6701 19.19 53.6701 19.26C53.6735 19.33 53.6751 19.38 53.6751 19.41V21H53.2851ZM58.572 21V17.5H60.692V17.88H58.962V20.62H60.682V21H58.572ZM58.752 19.39V19.01H60.412V19.39H58.752ZM62.5052 21L61.1502 17.5H61.5902L62.4602 19.78C62.5002 19.8833 62.5352 19.975 62.5652 20.055C62.5952 20.135 62.6219 20.2117 62.6452 20.285C62.6719 20.355 62.6969 20.425 62.7202 20.495C62.7435 20.565 62.7685 20.6417 62.7952 20.725L62.6652 20.73C62.6985 20.6167 62.7302 20.5117 62.7602 20.415C62.7935 20.3183 62.8269 20.22 62.8602 20.12C62.8969 20.0167 62.9419 19.8967 62.9952 19.76L63.8602 17.5H64.3002L62.9052 21H62.5052ZM64.9136 21V17.5H67.0336V17.88H65.3036V20.62H67.0236V21H64.9136ZM65.0936 19.39V19.01H66.7536V19.39H65.0936ZM67.8818 21V17.5H69.2518C69.4551 17.5 69.6385 17.5483 69.8018 17.645C69.9685 17.7383 70.1001 17.8667 70.1968 18.03C70.2935 18.1933 70.3418 18.3783 70.3418 18.585C70.3418 18.7783 70.2951 18.9533 70.2018 19.11C70.1085 19.2667 69.9818 19.3917 69.8218 19.485C69.6618 19.575 69.4818 19.62 69.2818 19.62H68.2718V21H67.8818ZM70.0168 21L69.1368 19.46L69.5118 19.33L70.4818 21H70.0168ZM68.2718 19.24H69.3168C69.4401 19.24 69.5485 19.2117 69.6418 19.155C69.7351 19.0983 69.8085 19.0217 69.8618 18.925C69.9151 18.825 69.9418 18.7117 69.9418 18.585C69.9418 18.4483 69.9101 18.3267 69.8468 18.22C69.7835 18.1133 69.6951 18.03 69.5818 17.97C69.4718 17.91 69.3451 17.88 69.2018 17.88H68.2718V19.24ZM71.8636 21V19.255L71.8986 19.5L70.4836 17.5H70.9586L72.1186 19.16L72.0136 19.15L73.0786 17.5H73.5286L72.1736 19.555L72.2486 19.215V21H71.8636ZM74.79 21V17.88H73.79V17.5H76.22V17.88H75.18V21H74.79ZM79.1946 21V17.5H79.5846V21H79.1946ZM76.8546 21V17.5H77.2446V21H76.8546ZM77.0446 19.445V19.065H79.3596V19.445H77.0446ZM80.4244 21V20.63H80.9894V17.87H80.4244V17.5H81.9444V17.87H81.3794V20.63H81.9444V21H80.4244ZM82.7861 21V17.5H83.1411L85.4311 20.53L85.3611 20.62C85.3511 20.5667 85.3428 20.4867 85.3361 20.38C85.3328 20.2733 85.3278 20.1533 85.3211 20.02C85.3178 19.8833 85.3144 19.7417 85.3111 19.595C85.3078 19.4483 85.3044 19.305 85.3011 19.165C85.3011 19.025 85.3011 18.8983 85.3011 18.785V17.5H85.6911V21H85.3261L83.0461 18.01L83.1061 17.905C83.1161 18.0383 83.1244 18.17 83.1311 18.3C83.1411 18.43 83.1478 18.555 83.1511 18.675C83.1578 18.795 83.1628 18.905 83.1661 19.005C83.1694 19.105 83.1711 19.19 83.1711 19.26C83.1744 19.33 83.1761 19.38 83.1761 19.41V21H82.7861ZM88.2466 21.05C87.99 21.05 87.7516 21.005 87.5316 20.915C87.3116 20.825 87.1183 20.7 86.9516 20.54C86.785 20.38 86.655 20.1917 86.5616 19.975C86.4716 19.755 86.4266 19.5167 86.4266 19.26C86.4266 19.0033 86.4716 18.7667 86.5616 18.55C86.655 18.33 86.7816 18.14 86.9416 17.98C87.105 17.82 87.295 17.6967 87.5116 17.61C87.7316 17.52 87.9666 17.475 88.2166 17.475C88.3933 17.475 88.5666 17.5 88.7366 17.55C88.91 17.6 89.0666 17.67 89.2066 17.76C89.3466 17.85 89.46 17.9517 89.5466 18.065L89.2866 18.33C89.1933 18.2333 89.0883 18.15 88.9716 18.08C88.855 18.01 88.7316 17.955 88.6016 17.915C88.475 17.875 88.3483 17.855 88.2216 17.855C88.025 17.855 87.8416 17.89 87.6716 17.96C87.505 18.03 87.3583 18.1283 87.2316 18.255C87.105 18.3783 87.0066 18.5267 86.9366 18.7C86.8666 18.87 86.8316 19.0567 86.8316 19.26C86.8316 19.4567 86.8666 19.6417 86.9366 19.815C87.01 19.985 87.1116 20.135 87.2416 20.265C87.375 20.3917 87.5283 20.49 87.7016 20.56C87.875 20.63 88.0616 20.665 88.2616 20.665C88.4183 20.665 88.565 20.6417 88.7016 20.595C88.8416 20.5483 88.9633 20.4833 89.0666 20.4C89.17 20.3133 89.25 20.2133 89.3066 20.1C89.3633 19.9867 89.3916 19.865 89.3916 19.735V19.56L89.4716 19.66H88.2416V19.275H89.7816C89.785 19.3017 89.7883 19.3333 89.7916 19.37C89.795 19.4033 89.7966 19.4383 89.7966 19.475C89.8 19.5083 89.8016 19.54 89.8016 19.57C89.8016 19.7867 89.7616 19.9867 89.6816 20.17C89.6016 20.35 89.49 20.5067 89.3466 20.64C89.2066 20.77 89.0433 20.8717 88.8566 20.945C88.67 21.015 88.4666 21.05 88.2466 21.05Z"
        fill={color}
        opacity={0.7}
      />
    </svg>
  );
};

export default AppLogo;