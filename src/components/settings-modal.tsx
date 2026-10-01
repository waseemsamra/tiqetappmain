'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, Wallet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CURRENCIES, LANGUAGES } from '@/lib/preferences';
import { usePreferences } from './preferences-provider';

interface SettingsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function SettingsModal({ isOpen, onOpenChange }: SettingsModalProps) {
  const { preferences, savePreferences, isSaving } = usePreferences();
  const [language, setLanguage] = useState(preferences.language);
  const [currency, setCurrency] = useState(preferences.currency);

  // Re-sync whenever the modal is opened so it never shows a stale selection.
  useEffect(() => {
    if (isOpen) {
      setLanguage(preferences.language);
      setCurrency(preferences.currency);
    }
  }, [isOpen, preferences.language, preferences.currency]);

  const handleSave = () => {
    savePreferences({ language, currency });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[14px] p-0 gap-0 sm:max-w-[440px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border px-6 py-[22px] pr-4">
          <DialogTitle className="text-[19px] font-bold tracking-[-0.2px]">
            Update your settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 py-6">
          <div className="relative space-y-2.5">
            <label
              htmlFor="settings-language"
              className="flex items-center gap-2.5 text-[15px] font-bold tracking-[-0.1px]"
            >
              <MessageCircle className="h-[15px] w-[15px]" />
              Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger
                id="settings-language"
                className="h-[52px] w-full rounded-[10px] border-[1.5px] px-[18px] text-[15px] data-[state=open]:border-[#6B6EE0] data-[state=open]:shadow-[0_0_0_4px_rgba(107,110,224,0.12)]"
              >
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="max-h-[340px] rounded-[10px]">
                {LANGUAGES.map((option) => (
                  <SelectItem key={option.code} value={option.code} className="py-3 text-[15px]">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative space-y-2.5">
            <label
              htmlFor="settings-currency"
              className="flex items-center gap-2.5 text-[15px] font-bold tracking-[-0.1px]"
            >
              <Wallet className="h-[15px] w-[15px]" />
              Currency
            </label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger
                id="settings-currency"
                className="h-[52px] w-full rounded-[10px] border-[1.5px] px-[18px] text-[15px] data-[state=open]:border-[#6B6EE0] data-[state=open]:shadow-[0_0_0_4px_rgba(107,110,224,0.12)]"
              >
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[340px] rounded-[10px]">
                {CURRENCIES.map((option) => (
                  <SelectItem key={option.code} value={option.code} className="py-3 text-[15px]">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-[13px] leading-[1.6] text-muted-foreground">
            Where applicable, prices will be converted and shown in the currency you select. The
            currency you pay in may differ based on your reservation.
          </p>
        </div>

        <DialogFooter className="px-6 pb-6">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="h-[52px] w-full rounded-[10px] bg-[#6B6EE0] text-[15px] font-bold tracking-[0.2px] hover:bg-[#5A5DC8] hover:shadow-[0_8px_20px_rgba(107,110,224,0.35)]"
          >
            {isSaving ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
