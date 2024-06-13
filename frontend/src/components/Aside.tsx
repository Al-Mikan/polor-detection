import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { FaCalendarAlt, FaChartBar } from 'react-icons/fa';
import { Button, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { BiChevronDown } from 'react-icons/bi';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';
import { AppContext } from '@/pages/_app';

import { PolarProps } from './type';
import { getPolars } from '../utils/polars';
import { FaGear } from 'react-icons/fa6';

type DialogProps = {
  open: boolean;
  selectedValue: PolarProps;
  onClose: (value: PolarProps) => void;
  polars: PolarProps[];
};

export const MUIDialog = ({
  open,
  selectedValue,
  onClose,
  polars,
}: DialogProps) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const effectivePolars = polars.length === 0 ? [{ id: 1, polarName: 'sample' }] : polars;

  const handleListItemClick = (value: PolarProps) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>名前を選択してください</DialogTitle>
      <List sx={{ pt: 0 }}>
        {polars.map((polar) => (
          <ListItem disableGutters key={polar.id}>
            <ListItemButton onClick={() => handleListItemClick(polar)}>
              <ListItemText primary="ホッキョクグマ"  />
              <ListItemText primary={polar.polarName} sx={{fontWeight:400}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const PolarSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<PolarProps>({} as PolarProps);
  const { id, setId, polars, setPolars } = useContext(AppContext);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: PolarProps) => {
    setOpen(false);
    setSelectedValue(value);
    setId(value.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPolars();
        if (data.length > 0) {
          setPolars(data);
          setSelectedValue(data[0]);
        } else {
          console.error('No data found');
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, [setPolars]);

  return (
    <div>
      <MUIDialog selectedValue={selectedValue} open={open} onClose={handleClose} polars={polars} />
      <Button className="rounded-md cursor-pointer bg-[#EAE9E9] w-[160px] h-[50px] text-black px-6 py-2 shadow-none hover:bg-[#EAE9E9] hover:shadow-md" onClick={handleClickOpen} variant="contained">
        {selectedValue ? selectedValue.polarName : '選択してください'}
        <BiChevronDown />
      </Button>
    </div>
  );
};

const Aside = () => {
  const router = useRouter();
  const { pathname } = router;
  
  return (
    <div className="bg-[#FFFFFF] w-[220px] h-full fixed top-0 z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="py-10">
          <Image src="./polarIcon.svg" width={120} height={120} alt="Polar Icon" />
        </div>
        <Link href="/">
          <Button className={`rounded-full hover:bg-[#EAE9E9] w-[180px] hover:shadow-md ${pathname === "/" ? "bg-[#F4F3F3]" : "bg-white"}`}>
            <div className="bg-[#48CAD9] p-3 rounded-full mr-3">
              <FaCalendarAlt className="w-[16px] h-[16px] text-white" />
            </div>
            <p className="text-gray-700 w-full flex items-start font-semibold">
              行動記録
            </p>
          </Button>
        </Link>
        <Link href="/graph">
          <Button className={`rounded-full hover:bg-[#EAE9E9] w-[180px] hover:shadow-md ${pathname === "/graph" ? "bg-[#F4F3F3]" : "bg-white"}`}>
            <div className="bg-[#F09783] p-3 rounded-full mr-3">
              <FaChartBar className="w-[16px] h-[16px] text-white" />
            </div>
            <p className="text-gray-700 w-full flex items-start font-semibold">
              グラフ
            </p>
          </Button>
        </Link>
        <Link href="/setting">
          <Button className={`rounded-full hover:bg-[#EAE9E9] w-[180px] hover:shadow-md ${pathname === "/graph" ? "bg-[#F4F3F3]" : "bg-white"}`}>
            <div className="bg-slate-600 p-3 rounded-full mr-3">
              <FaGear className="w-[16px] h-[16px] text-white" />
            </div>
            <p className="text-gray-700 w-full flex items-start font-semibold">
              設定
            </p>
          </Button>
        </Link>
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <PolarSelect />
      </div>
    </div>
  );
};

export default Aside;
