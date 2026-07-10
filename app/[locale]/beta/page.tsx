"use client"

import * as React from "react"
import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
} from "@/registry/dga/ui/beta/attachment"
import {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/registry/dga/ui/beta/bubble"
import { Button } from "@/registry/dga/ui/button"
import { DirectionToggle } from "@/components/docs/direction-toggle"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  File01Icon,
  Download01Icon,
  Cancel01Icon,
  Delete01Icon,
  TickDouble01Icon,
  AlertCircleIcon,
  SentIcon,
  DocumentAttachmentIcon,
  AiCloudIcon,
  Message01Icon,
} from "@hugeicons/core-free-icons"

export default function BetaPreviewPage() {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      sender: "bot",
      content: "مرحباً بك! أنا مساعدك الذكي المطور بالهوية الوطنية السعودية. كيف يمكنني مساعدتك اليوم؟ 🇸🇦",
      timestamp: "10:30 ص",
      variant: "tinted" as const,
      align: "start" as const,
    },
    {
      id: 2,
      sender: "user",
      content: "أهلاً بك، أود تجربة رفع ملفاتك الجديدة واستعراض الرسائل وعناصر واجهة المستخدم المطورة.",
      timestamp: "10:31 ص",
      variant: "default" as const,
      align: "end" as const,
    }
  ])

  const [inputText, setInputText] = React.useState("")
  const [attachments, setAttachments] = React.useState([
    {
      id: "file-1",
      title: "دليل الهوية البصرية.pdf",
      description: "4.2 MB • مكتمل",
      state: "done" as const,
      type: "pdf"
    },
    {
      id: "file-2",
      title: "رؤية_السعودية_2030.docx",
      description: "1.8 MB • جاري المعالجة...",
      state: "processing" as const,
      type: "doc"
    },
    {
      id: "file-3",
      title: "تقرير_الربع_الأول.xlsx",
      description: "فشل الرفع • حاول مجدداً",
      state: "error" as const,
      type: "xls"
    }
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMsg = {
      id: Date.now(),
      sender: "user",
      content: inputText,
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' }),
      variant: "default" as const,
      align: "end" as const,
    }

    setMessages((prev) => [...prev, newMsg])
    setInputText("")

    // Simulating Bot Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          content: `تلقيت رسالتك: "${inputText}". هذه الفقاعة تستخدم متغير اللون الهادئ (Tinted Variant) المتطابق مع لون SA-50 الخاص بهيئة الحكومة الرقمية.`,
          timestamp: new Date().toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' }),
          variant: "tinted" as const,
          align: "start" as const,
        }
      ])
    }, 1000)
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id))
  }

  const retryAttachment = (id: string) => {
    setAttachments((prev) =>
      prev.map((att) =>
        att.id === id ? { ...att, state: "processing", description: "جاري رفع الملف..." } : att
      )
    )

    setTimeout(() => {
      setAttachments((prev) =>
        prev.map((att) =>
          att.id === id ? { ...att, state: "done", description: "1.2 MB • مكتمل" } : att
        )
      )
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#FCFCFD] dark:bg-[#111927] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#E5E7EB] dark:border-[#1F2A37] pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#111927] dark:text-[#FCFCFD] tracking-tight">
              معاينة المكونات التجريبية (Beta)
            </h1>
            <p className="mt-2 text-sm text-[#4B5563] dark:text-[#9CA3AF]">
              استعراض وتجربة تفاعلية لمكوني <code className="bg-[#F3F4F6] dark:bg-[#1F2A37] px-1.5 py-0.5 rounded text-[#1B8354] font-semibold">Attachment</code> و <code className="bg-[#F3F4F6] dark:bg-[#1F2A37] px-1.5 py-0.5 rounded text-[#1B8354] font-semibold">Bubble</code> بالهوية السعودية.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#4B5563] dark:text-[#9CA3AF]">تغيير الاتجاه:</span>
            <DirectionToggle />
          </div>
        </div>

        {/* Dynamic Interactive Demo: Chat Interface */}
        <section className="bg-white dark:bg-[#1C2536] rounded-2xl border border-[#E5E7EB] dark:border-[#1F2A37] shadow-sm overflow-hidden flex flex-col h-[650px]">
          <div className="bg-[#F9FAFB] dark:bg-[#121824] px-6 py-4 border-b border-[#E5E7EB] dark:border-[#1F2A37] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#E8F5E9] dark:bg-[#1B8354]/20 flex items-center justify-center text-[#1B8354]">
                <HugeiconsIcon icon={AiCloudIcon} className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#111927] dark:text-[#FCFCFD] text-sm">مساعد الهوية الوطنية الرقمي</h3>
                <span className="text-xs text-[#069454] font-semibold flex items-center gap-1">🟢 متصل الآن</span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <BubbleGroup>
              {messages.map((msg) => (
                <Bubble key={msg.id} variant={msg.variant} align={msg.align}>
                  <BubbleContent>
                    <p>{msg.content}</p>
                    <span className="mt-1 block text-[10px] text-end opacity-70">{msg.timestamp}</span>
                  </BubbleContent>
                  {msg.sender === "bot" && (
                    <BubbleReactions side="bottom" align="start">
                      <button className="hover:scale-125 transition-transform">👍</button>
                      <button className="hover:scale-125 transition-transform">🇸🇦</button>
                      <button className="hover:scale-125 transition-transform">❤️</button>
                    </BubbleReactions>
                  )}
                </Bubble>
              ))}
            </BubbleGroup>
          </div>

          {/* File Attachments Area in Input Panel */}
          {attachments.length > 0 && (
            <div className="px-6 py-3 bg-[#FCFCFD] dark:bg-[#121824] border-t border-[#E5E7EB] dark:border-[#1F2A37]">
              <AttachmentGroup>
                {attachments.map((att) => (
                  <Attachment key={att.id} state={att.state} size="sm">
                    <AttachmentMedia variant="icon">
                      <HugeiconsIcon icon={File01Icon} className="size-4" />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>{att.title}</AttachmentTitle>
                      <AttachmentDescription>{att.description}</AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions>
                      {att.state === "error" && (
                        <AttachmentAction onClick={() => retryAttachment(att.id)} size="icon-xs" title="إعادة المحاولة">
                          <HugeiconsIcon icon={SentIcon} className="size-3 text-[#1B8354]" />
                        </AttachmentAction>
                      )}
                      <AttachmentAction onClick={() => removeAttachment(att.id)} size="icon-xs" title="حذف">
                        <HugeiconsIcon icon={Delete01Icon} className="size-3 text-destructive" />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>
                ))}
              </AttachmentGroup>
            </div>
          )}

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#F9FAFB] dark:bg-[#121824] border-t border-[#E5E7EB] dark:border-[#1F2A37] flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="w-full bg-white dark:bg-[#1C2536] border border-[#E5E7EB] dark:border-[#1F2A37] rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8354] focus:border-transparent dark:text-white"
              />
            </div>
            <Button type="submit" className="bg-[#1B8354] hover:bg-[#166A45] text-white rounded-xl py-3 px-6 text-sm font-semibold transition-colors flex items-center gap-2">
              <span>إرسال</span>
              <HugeiconsIcon icon={SentIcon} className="size-4 rtl:rotate-180" />
            </Button>
          </form>
        </section>

        {/* Detailed Variant Documentation Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bubble Variants Spec */}
          <div className="bg-white dark:bg-[#1C2536] rounded-2xl border border-[#E5E7EB] dark:border-[#1F2A37] p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#111927] dark:text-[#FCFCFD]">أنواع فقاعات الرسائل (Bubble Variants)</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#4B5563]">Default (الأخضر السعودي - للمرسل):</span>
                <Bubble variant="default" align="start">
                  <BubbleContent>مرحباً بك في المنصة الوطنية الموحدة.</BubbleContent>
                </Bubble>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#4B5563]">Tinted (أخضر خفيف - للمستلم/البوت):</span>
                <Bubble variant="tinted" align="start">
                  <BubbleContent>مرحباً بك في المنصة الوطنية الموحدة.</BubbleContent>
                </Bubble>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#4B5563]">Secondary (رمادي عادي):</span>
                <Bubble variant="secondary" align="start">
                  <BubbleContent>تم استلام طلبك بنجاح وسوف يتم الرد قريباً.</BubbleContent>
                </Bubble>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#4B5563]">Outline (محدد بحدود):</span>
                <Bubble variant="outline" align="start">
                  <BubbleContent>تاريخ انتهاء الهوية الوطنية يقترب.</BubbleContent>
                </Bubble>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#4B5563]">Destructive (حالة خطأ):</span>
                <Bubble variant="destructive" align="start">
                  <BubbleContent>حدث خطأ في معالجة طلبك، يرجى إعادة المحاولة.</BubbleContent>
                </Bubble>
              </div>
            </div>
          </div>

          {/* Attachment States Spec */}
          <div className="bg-white dark:bg-[#1C2536] rounded-2xl border border-[#E5E7EB] dark:border-[#1F2A37] p-6 space-y-4">
            <h3 className="font-bold text-lg text-[#111927] dark:text-[#FCFCFD]">حالات رفع الملفات (Attachment States)</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#4B5563]">Done (مكتمل):</span>
                <Attachment state="done">
                  <AttachmentMedia variant="icon">
                    <HugeiconsIcon icon={File01Icon} className="size-4" />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>الهوية_الوطنية.jpg</AttachmentTitle>
                    <AttachmentDescription>1.4 MB • مكتمل</AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction size="icon-xs">
                      <HugeiconsIcon icon={Download01Icon} className="size-3" />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#4B5563]">Uploading (جاري الرفع):</span>
                <Attachment state="uploading">
                  <AttachmentMedia variant="icon">
                    <HugeiconsIcon icon={File01Icon} className="size-4" />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>شهادة_الميلاد.pdf</AttachmentTitle>
                    <AttachmentDescription>جاري الرفع... 45%</AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction size="icon-xs">
                      <HugeiconsIcon icon={Cancel01Icon} className="size-3" />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#4B5563]">Error (فشل الرفع):</span>
                <Attachment state="error">
                  <AttachmentMedia variant="icon">
                    <HugeiconsIcon icon={File01Icon} className="size-4 text-destructive" />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>العقد_الموحد.pdf</AttachmentTitle>
                    <AttachmentDescription>فشل الرفع</AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction size="icon-xs">
                      <HugeiconsIcon icon={AlertCircleIcon} className="size-3 text-destructive" />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#4B5563]">Vertical Orientation (تخطيط رأسي):</span>
                <div className="flex gap-4">
                  <Attachment state="done" orientation="vertical">
                    <AttachmentMedia variant="icon" className="w-full">
                      <HugeiconsIcon icon={File01Icon} className="size-6" />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>ملف_البيانات</AttachmentTitle>
                      <AttachmentDescription>2.3 MB</AttachmentDescription>
                    </AttachmentContent>
                  </Attachment>
                  <Attachment state="idle" orientation="vertical">
                    <AttachmentMedia variant="icon" className="w-full">
                      <HugeiconsIcon icon={DocumentAttachmentIcon} className="size-6" />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>إضافة ملف</AttachmentTitle>
                      <AttachmentDescription>انقر هنا</AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentTrigger />
                  </Attachment>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
