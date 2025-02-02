import "@/App.css";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { type Theme, createTheme } from "@mui/material/styles";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { heIL as materialLocaleHebrew } from "@mui/material/locale";
import { heIL as dataGridLocaleHebrew } from "@mui/x-data-grid/locales";
import { heIL as datePickerLocaleHebrew } from "@mui/x-date-pickers/locales";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/he";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("he");
dayjs.tz.setDefault("Asia/Jerusalem");

import { type ReactNode, useEffect, useMemo } from "react";

const createCustomTheme = (direction: "ltr" | "rtl"): Theme => {
  const FONT_FAMILY = "Rubik";

  const DARK_MAIN_COLOR = "#FAFAFA";

  const DARK_BACKGROUND = "#121212";
  const DARK_PAPER_BACKGROUND = "#1F1F1F";

  const theme = createTheme(
    {
      direction: direction,
      zIndex: {
        appBar: 1100,
        drawer: 1200,
      },
      palette: {
        mode: "dark",
        background: {
          default: DARK_BACKGROUND,
          paper: DARK_PAPER_BACKGROUND,
        },
        primary: {
          main: DARK_MAIN_COLOR,
          contrastText: DARK_BACKGROUND,
        },
      },
      typography: {
        fontFamily: FONT_FAMILY,
        allVariants: {
          color: DARK_MAIN_COLOR,
        },
      },
      components: {
        MuiTypography: {
          styleOverrides: {
            root: {
              maxWidth: "none !important",
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor: DARK_MAIN_COLOR,
              color: DARK_BACKGROUND,
              fontSize: 12,
              fontFamily: FONT_FAMILY,
              fontWeight: 500,
            },
            arrow: {
              color: DARK_MAIN_COLOR,
            },
          },
        },
      },
    },
    materialLocaleHebrew,
    dataGridLocaleHebrew,
    datePickerLocaleHebrew
  );

  return theme;
};

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function MuiProvider({ children }: { children: ReactNode }) {
  const theme = useMemo(() => createCustomTheme("rtl"), []);

  useEffect(() => {
    document.body.dir = "rtl";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"he"}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </CacheProvider>
    </ThemeProvider>
  );
}
